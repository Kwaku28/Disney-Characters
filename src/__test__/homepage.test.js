import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { initialState } from '../redux/characters/charactersSlice';
import HomePage from '../components/pages/homePage';
import store from '../redux/store';

it('should return the correct initialState', () => {
  expect(initialState).toEqual({
    characters: [],
    status: 'idle',
    error: null,
    loading: false,
  });
});

it('Renders the exact page', () => {
  const root = renderer.create(
    <Provider store={store}>
      <Router>
        <HomePage />
      </Router>
    </Provider>,
  ).toJSON;
  expect(root).toMatchSnapshot();
});
