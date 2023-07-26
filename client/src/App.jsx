import './App.css';
import axios from 'axios';
import { Detail, Form, Home, Landing } from './views/index';
import Nav from './components/Nav/Nav';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const onSearch = async (name) => {
      try {
        const { data } = await axios(`http://localhost:3001/countries/name?name=${name}`)
           
        if (data.name) {
          setCountries((oldCountries) => [...oldCountries, data]);
        }
  
      } catch (error) {
        alert('There are no countries with that name!');
      }
  };

  return (
    <div>
      { location.pathname !== '/' && <Nav onSearch={onSearch}/> }
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<Form/>}/>
      </Routes>
    </div>
  )
};

export default App;