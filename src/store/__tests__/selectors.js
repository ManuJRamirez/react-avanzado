import { getUser } from '../selectors';

describe('Selectors', () => {
  test('getUser selector', () => {
    const state = {
      auth: {
        user: {
          id: 1,
          username: 'testUser',
        },
        auth: true,
      },
    };

    const result = getUser(state);
    expect(result).toEqual({
      id: 1,
      username: 'testUser',
    });
  });
});
