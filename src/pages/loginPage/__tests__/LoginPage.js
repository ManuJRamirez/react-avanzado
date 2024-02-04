import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../loginPage';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { authLogin } from '../../../store/actions';

jest.mock('../../../store/actions');

const userType = (input, text) => userEvent.type(input, text);

describe('LoginPage', () => {
  const state = { ui: { isFetching: false, error: null } };
  const store = {
    getState: () => state,
    subscribe: () => {},
  };

  const renderComponent = () =>
    render(
      <Router>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </Router>,
    );

  test('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch authLogin action', async () => {
    const email = 'hola@hola.es';
    const password = 'Hola.123';

    renderComponent();

    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitButton = screen.getByTestId('loginButton');

    await act(() => userType(emailInput, email));
    await act(() => userType(passwordInput, password));

    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ email });
  });
});
