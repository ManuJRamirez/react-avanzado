import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { deleteAd } from '../../../store/actions';
import { Provider } from 'react-redux';
import AdvertPage from '../advertPage';

jest.mock('../../../store/actions');

describe('AdvertPage', () => {
  const state = { ui: { isFetching: false, error: null } };
  const store = {
    getState: () => state,
    subscribe: () => {},
  };

  const renderComponent = () =>
    render(
      <Router>
        <Provider store={store}>
          <AdvertPage />
        </Provider>
      </Router>,
    );

  test('should dispatch deleteAd action', async () => {
    const id = 'b9ada4b0-28d3-4664-9055-2791b236c648';

    renderComponent();

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);

    const confirmButton = await screen.findByTestId('confirmButton');
    expect(confirmButton).toBeInTheDocument();

    await userEvent.click(confirmButton);

    expect(deleteAd).toHaveBeenCalled();
    expect(deleteAd).toHaveBeenCalledWith(id);
  });
});
