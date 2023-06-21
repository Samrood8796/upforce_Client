import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import EditRegister from './pages/EditRegister';
import UserDetails from './pages/UserDetails';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-register/:id" element={<EditRegister />} />
          <Route path="/user-details/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
}
 
export default App;
 