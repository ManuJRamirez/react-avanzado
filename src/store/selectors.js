export const getAuthState = state => state.auth;

export const getUser = state => getAuthState(state).user;

export const getIsLogged = state => getAuthState(state).auth;

export const getAds = state => state.ads;

export const getAdDetailsById = (state, adId) =>
  state.ads.find(ad => ad.id === adId);

export const getTags = state => state.tags;
