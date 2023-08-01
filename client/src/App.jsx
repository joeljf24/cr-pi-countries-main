import './App.css';
import Nav from './components/Nav/Nav';
import { Detail, Form, Home, Landing } from './views/index';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <Nav/>}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;