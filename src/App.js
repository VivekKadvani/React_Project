import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderMain } from './components/Header';
import NewListing from './components/NewListing';
import CurrentListing from './components/CurrentListing';
import WhiteList from './components/WhiteList';
import LandingPage from './components/LandingPage';


function App() {
  return (
    <Router>
      <div className="text-center">
        <HeaderMain />
        <Routes>
          <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
          </Route>
          <Route path="/new" element={<NewListing />} />

          <Route path="/current" element={<CurrentListing />} />


          <Route path="/whitelist" element={<WhiteList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
