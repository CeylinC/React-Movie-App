import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Homepage from './page/Homepage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={Homepage()}>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
