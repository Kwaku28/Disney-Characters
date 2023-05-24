import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/homePage';
import CharactersPage from './components/pages/charactersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/charactersPage/:id" element={<CharactersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
