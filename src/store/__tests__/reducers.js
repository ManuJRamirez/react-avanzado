import { reducer } from '../reducers';
import * as types from '../types';

describe('Reducer Tests', () => {
  it('should handle AUTH_LOGOUT action', () => {
    const initialState = {
      auth: true,
      user: { id: 1, username: 'example' },
      ads: [],
      tags: [],
      detail: {},
    };
    const action = {
      type: types.AUTH_LOGOUT,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      auth: false,
      user: null,
      ads: [],
      tags: [],
      detail: {},
    });
  });
});
