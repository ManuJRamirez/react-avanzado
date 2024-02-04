import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  GET_TAGS,
  GET_AD_LIST,
  GET_AD_DETAILS,
  CREATE_AD,
  DELETE_AD,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './types';

const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
const fetchDataSuccess = data => ({ type: FETCH_DATA_SUCCESS, payload: data });
const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const authLogin = user => ({
  type: AUTH_LOGIN,
  payload: user,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const getTagsData = tags => ({
  type: GET_TAGS,
  payload: { tags },
});

export const getAdList = ads => ({
  type: GET_AD_LIST,
  payload: { ads },
});

export const getAdDetails = detail => ({
  type: GET_AD_DETAILS,
  payload: { detail },
});

export const createAd = adData => ({
  type: CREATE_AD,
  payload: adData,
});

export const deleteAd = adId => ({
  type: DELETE_AD,
  payload: adId,
});

export const fetchDataAsync = url => {
  return async dispatch => {
    dispatch(fetchDataRequest());

    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};
