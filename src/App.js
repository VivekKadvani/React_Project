import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderMain } from './components/Header';
import NewListing from './components/NewListing';
import CurrentListing from './components/CurrentListing';
import WhiteList from './components/WhiteList';


function App() {
  return (
    <Router>
      <div className="App">
        <HeaderMain />
        <Routes>
          <Route path='/'>
            <Route index element={<NewListing />} />
            <Route path="/home" element={<NewListing />} />
          </Route>

          <Route path="/current" element={<CurrentListing />} />


          <Route path="/whitelist" element={<WhiteList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
