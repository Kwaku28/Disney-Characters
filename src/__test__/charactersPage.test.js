import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import CharactersPage from '../components/pages/charactersPage';
import store from '../redux/store';

it('Renders the exact page', () => {
  const root = renderer.create(
    <Provider store={store}>
      <Router>
        <CharactersPage />
      </Router>
    </Provider>,
  ).toJSON;
  expect(root).toMatchSnapshot();
});
