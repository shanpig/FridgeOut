import { render, screen } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import initialState from './mockData/state/state.json';

test('renders learn react link', async () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = await screen.findByText(/Fridge Out/i);
  expect(linkElement).toBeInTheDocument();
});
