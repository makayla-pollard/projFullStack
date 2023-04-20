import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllMovie  from './components/AllMovie';
import Register from './components/Register';
import Login from './components/Login';
import MovieDetail from './components/MovieDetails';
import NavBar from './components/nav/navbar';
import Search from './components/Search'
import Admin from './components/Admin';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <NavBar/>
        <main className='body'>
          <Routes>
            <Route path='/' element = {<AllMovie/>}/>
            <Route path='/register' element = {<Register/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/Movie/:id' element = {<MovieDetail/>}/>
            <Route path='/Search' element ={<Search/>}/>
            <Route path='/admin' element={<Admin/>}/>
          </Routes>
        </main>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
