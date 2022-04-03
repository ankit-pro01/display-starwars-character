import './App.css';
import CharacterList from './Views/CharacterList/characterList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Views/Home/home';
import CharacterDetails from './Views/CharacterDetails/CharacterDetails';
import NavBar from './components/NavBar/NavBar';
import Favourities from './Views/Favouties/Favourities';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourities" element={<Favourities />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/characters" element={<CharacterDetails />}>
            <Route path=":characterId" element={<CharacterDetails />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <div className="alert alert-secondary" role="alert">
                  LOST ? <Link to="/">click here for stars wars</Link>
                </div>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
