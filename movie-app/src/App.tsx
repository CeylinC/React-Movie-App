import { BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Homepage from './page/Homepage/Homepage';
import Adminpage from './page/Adminpage/Adminpage';

function App() {

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/admin' element={<Adminpage />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
