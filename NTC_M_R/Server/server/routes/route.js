const express = require("express");
const router = express.Router();
const dashBoardController = require("../controllers/dashBoardController");

router.get("/test", dashBoardController.testFunction);
router.get("/personproducttypes", dashBoardController.getAllApis);
router.get("/brand", dashBoardController.getBrandApi);
router.post("/addUser", dashBoardController.addUser);
router.post("/updateUser", dashBoardController.updateUser);
router.get("/healthcheck", (req, res) => {
  return res.status(200).json({ message: "Valid request" });
});
router.get("/companybrands", dashBoardController.getCompanyBrandsApi);
router.post("/webhooks", (req, res) => {
  console.log('payload',req.body);
});

module.exports = router;