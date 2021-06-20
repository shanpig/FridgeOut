import { render, fireEvent, screen } from '@testing-library/react';
import IngredientInput from './IngredientInput';

import { React } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import initialState from '../../mockData/state/state.json';

const mockStore = configureStore();
const store = mockStore(initialState);
let INGREDIENT = {
  ingredient_name: '',
  ingredient_amount: '',
  ingredient_unit: '',
};
const setLeftover = (newIngredient) => (INGREDIENT = newIngredient);

describe('Testing IngredientInput component', () => {
  render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/">
            <IngredientInput
              ingredient={INGREDIENT}
              setLeftover={setLeftover}
            />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );

  const nameField = screen.getByPlaceholderText('雞肉');
  const amountField = screen.getByPlaceholderText('100');
  const unitField = screen.getByPlaceholderText('g');

  it('should have empty input value', () => {
    expect(nameField.value).toBe('');
    expect(amountField.value).toBe('');
    expect(unitField.value).toBe('');
  });

  it('should change value according to user input', () => {
    fireEvent.change(nameField, { target: { value: '牛肉' } });
    expect(nameField.value).toBe('牛肉');
    fireEvent.change(amountField, { target: { value: '1.5' } });
    expect(amountField.value).toBe('1.5');
    fireEvent.change(unitField, { target: { value: '斤' } });
    expect(unitField.value).toBe('斤');
  });
});
