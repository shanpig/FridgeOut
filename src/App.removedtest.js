import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

import { BrowserRouter, BrowserRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import initialState from './mockData/state/state.json';

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Testing App component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it('should show fridgeout text', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(getByText('Fridge Out')).toBeInTheDocument();
  });

  it('should redirect to 404 page when wrong route is typed', () => {
    renderWithRouter(
      <Provider store={store}>
        <Router>
          <App />
          <Link to="/asdfasdf" data-testid="wrong-route"></Link>
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('wrong-route'));

    expect(screen.getByText('沒有這個頁面')).toBeInTheDocument();
  });
});
