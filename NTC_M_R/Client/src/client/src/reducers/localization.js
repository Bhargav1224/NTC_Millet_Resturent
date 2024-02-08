const currentReducer = '@localization';

export const SET_LANGUAGE = `${currentReducer}/SET_LANGUAGE`;

const initialState = {
  language: window.localStorage.getItem('selectedLanguage') || 'EN'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE: {
      window.localStorage.setItem('selectedLanguage', action.payload);
      return {
        ...state,
        language: action.payload
      };
    }
    default:
      return state;
  }
};

export const setLanguage = (payload) => {
  return {
    type: SET_LANGUAGE,
    payload
  };
};
