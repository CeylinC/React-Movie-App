import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { LogInpage, Homepage, Adminpage, MovieListpage, AddMoviepage, SignUppage } from './page';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/admin' element={<Adminpage />}>
            <Route path="/admin/movie-list" element={<MovieListpage />} />
            <Route path="/admin/add-movie" element={<AddMoviepage />} />
          </Route>
          <Route path='/log-in' element={<LogInpage />} />
          <Route path='/sign-up' element={<SignUppage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;