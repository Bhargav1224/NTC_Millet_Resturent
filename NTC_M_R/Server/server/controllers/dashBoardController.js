const ac = require("./../grantObject");
const CONSTANTS = require("../constants/constant");
const HELPER = require("../helpers/helper");
const UserApplicationRoleModel = require("../models/userApplicationRolesModel");
const UserModel = require("../models/userModel");
require("dotenv").config();
const LoggerInfo = require("../helpers/logger");
const label = "dashBoardController";
const info = "info";
const errorMessage = "error";
const _ = require("lodash");
exports.testFunction = async (req, res, next) => {
  try {
    let user = res.locals.loggedInUser;
    // Grant permission who can use this API
    ac.grant(CONSTANTS.ROLE_PRODUCT_ADMIN).read("test");
    ac.grant(CONSTANTS.ROLE_BASIC).create("test");
    // check permission whether current user can use the API
    const permission = ac.can(user.role).read("test");
    if (permission.granted) {
      return res.status(200).json({
        result: "test",
      });
    } else {
      return res.status(403).json({
        message: CONSTANTS.ACCESS_DENIED,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};

const getPersonTypes = HELPER.callAPI(
  `${process.env.CLIENT_HOSTNAME}/${process.env.PERSON_TYPE_ENDPOINT}`,
  CONSTANTS.GET,
  null,
  null,
  null,
  process.env.CLIENT_BASIC_TOKEN
);
const getProductTypes = HELPER.callAPI(
  `${process.env.CLIENT_HOSTNAME}/${process.env.PRODUCT_TYPE_ENDPOINT}`,
  CONSTANTS.GET,
  null,
  null,
  null,
  process.env.CLIENT_BASIC_TOKEN
);
exports.getBrandApi = async (req, res, next) => {
  const { email } = req.query;
  const filter = {};
  if (email) {
    filter.email = email;
  }
  LoggerInfo(label, info).info(`Brand Api is Initiated by ${email}`);
  try {
    HELPER.callAPI(
      `${process.env.CLIENT_HOSTNAME}/${process.env.BRAND_ENDPOINT}`,
      CONSTANTS.GET,
      null,
      filter,
      null,
      process.env.CLIENT_BASIC_TOKEN
    )
      .then((response) => {
        if (response[0] && response[0].endpoint) {
          LoggerInfo(label, info).info(
            `${email} fetched Endpoint: ${response[0].endpoint} Successfully.`
          );
        }
        if (response && response.error) {
          LoggerInfo(label, info).info(
            `Brand Api called by ${response.error} with Email: ${email}`
          );
        }

        return res.status(200).json({
          code: 2001,
          message: CONSTANTS.SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        LoggerInfo(label, errorMessage).error(
          `While calling Brand API: ${error.message} with Email: ${email}`
        );
        return res.status(400).json({
          code: 2002,
          message: error.message,
        });
      });
  } catch (error) {
    LoggerInfo(label, errorMessage).error(
      `While calling Brand API: ${error.message} with Email: ${email}`
    );
    return res.status(500).json({
      code: 2003,
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};

exports.getAllApis = async (req, res, next) => {
  try {
    Promise.all([getPersonTypes, getProductTypes])
      .then((response) => {
        return res.status(200).json({
          code: 2001,
          message: CONSTANTS.SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          code: 2002,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      code: 2003,
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};

exports.addUser = (req, res, next) => {
  const clientPayload = req.body[1];
  const userPayload = req.body[0];
  const bodyData = {
    first_name: clientPayload.first_name,
    last_name: clientPayload.last_name,
    email: clientPayload.email,
    is_active: clientPayload.is_active,
    brands: clientPayload.brands,
  };
  try {
    HELPER.callAPI(
      `${process.env.STAGING_HOSTNAME}/${process.env.USER_ENDPOINT}`,
      CONSTANTS.POST,
      bodyData,
      null,
      null,
      process.env.CLIENT_BASIC_TOKEN
    )
      .then(async () => {
        let randomId = Math.floor(
          Math.random() * 100000000000000 + 1
        ).toString();
        if (
          !userPayload.firstName ||
          !userPayload.lastName ||
          !userPayload.email ||
          !userPayload.roleId
        ) {
          res.status(400).send({
            message: CONSTANTS.ALL_FIELDS,
          });
        } else {
          const emailExists = await UserModel.findOne({
            where: { email: userPayload.email },
          });
          if (emailExists) {
            res.send({
              message: CONSTANTS.EMAIL_EXISTS,
            });
          } else {
            UserModel.create({
              email: userPayload.email,
              userSurrogateID: randomId,
              firstName: userPayload.firstName,
              lastName: userPayload.lastName,
            })
              .then(async (userdata) => {
                UserApplicationRoleModel.create({
                  userId: userdata.id,
                  applicationId: userPayload.appId || 1,
                  rolesId: userPayload.roleId || 1,
                  miscData: JSON.stringify(userPayload),
                })
                  .then(() => {
                    return res.status(201).json({
                      user: userdata,
                      code: 2004,
                      message: CONSTANTS.USER_ADDED,
                    });
                  })
                  .catch(async (error) => {
                    await UserModel.destroy({
                      where: { userSurrogateID: userdata.userSurrogateID },
                    });
                  });
              })
              .catch((error) => {
                if (error.errors[0].validatorKey === "isEmail") {
                  return res.status(400).json({
                    message: CONSTANTS.VALID_EMAIL,
                  });
                } else {
                  res.status(500).send(error);
                }
              });
          }
        }
      })
      .catch((error) => {
        return res.status(400).json({
          code: 2007,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      code: 2003,
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};

exports.getCompanyBrandsApi = async (req, res, next) => {
  try {
    HELPER.callAPI(
      `${process.env.CLIENT_HOSTNAME}/${process.env.ACCOUNT_ENDPOINT}`,
      CONSTANTS.GET,
      null,
      null,
      null,
      process.env.CLIENT_BASIC_TOKEN
    )
      .then((response) => {
        return res.status(200).json({
          code: 2004,
          message: CONSTANTS.SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          code: 2005,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      code: 2006,
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};

exports.updateUser = (req, res, next) => {
  const clientPayload = req.body[1];
  const userPayload = req.body[0];
  const bodyData = {
    first_name: clientPayload.first_name,
    last_name: clientPayload.last_name,
    email: clientPayload.email,
    is_active: clientPayload.is_active,
    brands: clientPayload.brands,
  };
  try {
    HELPER.callAPI(
      `${process.env.STAGING_HOSTNAME}/${process.env.USER_ENDPOINT}`,
      CONSTANTS.POST,
      bodyData,
      null,
      null,
      process.env.CLIENT_BASIC_TOKEN
    )
      .then(async () => {
        const userResponse = await UserModel.findOne({
          where: { email: userPayload.email },
        });
        const data = {};
        if (userPayload.brands) {
          data.miscData = JSON.stringify(userPayload)
        }
        if(userPayload.roleId){
          data.rolesId = userPayload.roleId
        }
        const updatedResult = await UserApplicationRoleModel.update(data, {
          where: { userId: userResponse.id },
        });
        if (updatedResult) {
          const dataObject = {};
          if (userPayload.firstName) {
            dataObject.firstName = userPayload.firstName;
          }
          if(userPayload.lastName) {
            dataObject.lastName = userPayload.lastName
          }
  
          const user = await UserModel.update(dataObject, {
            where: { id: userResponse.id },
          });

          if (user) {
            return res.status(200).json({ message: CONSTANTS.UPDATESUCCESS, userDetails: user });
          } else {
            return res.status(400).json({ message: CONSTANTS.ERROR });
          }
        } else {
          return res.status(400).json({ message: CONSTANTS.USER_ID_NOT_FOUND });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          code: 2007,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      code: 2003,
      message: CONSTANTS.SOMETHING_WRONG,
    });
  }
};
