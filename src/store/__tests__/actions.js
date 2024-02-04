import { getAdList, fetchDataAsync } from '../actions';
import {
  GET_AD_LIST,
  AUTH_LOGIN,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from '../types';

describe('getAdList', () => {
  test('should return an "GET_AD_LIST" action', () => {
    const ads = 'ads';
    const expectedAction = {
      type: GET_AD_LIST,
      payload: { ads },
    };
    const action = getAdList(ads);
    expect(action).toEqual(expectedAction);
  });
});

describe('fetchDataAsync', () => {
  it('creates FETCH_DATA_SUCCESS when fetching data has been done', async () => {
    const mockData = { data: 'mocked data' };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const expectedActions = [
      { type: FETCH_DATA_REQUEST },
      { type: FETCH_DATA_SUCCESS, payload: mockData },
    ];

    const dispatch = jest.fn();
    await fetchDataAsync()(dispatch);

    expect(dispatch.mock.calls).toEqual([
      [{ type: FETCH_DATA_REQUEST }],
      [{ type: FETCH_DATA_SUCCESS, payload: mockData }],
    ]);
  });
});
