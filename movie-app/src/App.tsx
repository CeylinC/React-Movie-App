import { BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Homepage from './page/Homepage/Homepage';
import Adminpage from './page/Adminpage/Adminpage';
import MovieListpage from './page/MovieListpage/MovieListpage';

function App() {

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/admin' element={<Adminpage />}>
          <Route index path="/admin/movie-list" element={<MovieListpage/>} />
          {/* <Route path="/admin/add-movie" element={} /> */}
        </Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
