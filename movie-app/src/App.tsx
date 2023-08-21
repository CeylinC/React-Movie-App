import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink
} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Homepage from './page/Homepage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
