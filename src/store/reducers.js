import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  GET_TAGS,
  GET_AD_LIST,
  GET_AD_DETAILS,
  CREATE_AD,
  DELETE_AD,
} from './types';

const defaultState = {
  auth: false,
  user: null,
  ads: [],
  tags: [],
  detail: {},
};

export function reducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.payload,
        auth: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        auth: false,
      };
    case GET_TAGS:
      const { tags } = action.payload;
      return {
        ...state,
        tags: tags,
      };
    case GET_AD_LIST:
      const { ads } = action.payload;
      return {
        ...state,
        ads: ads,
      };
    case GET_AD_DETAILS:
      const { detail } = action.payload;
      return {
        ...state,
        detail: detail,
      };
    case CREATE_AD:
      return {
        ...state,
        ads: [...state.ads, action.payload],
      };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => ad.id !== action.payload),
      };
    default:
      return state;
  }
}
