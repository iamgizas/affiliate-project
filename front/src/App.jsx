import UserRegister from './pages/user-forms/register/page';
import UserLogin from './pages/user-forms/login/page';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/user-forms/forgot-password/page';
import Navbar from './components/Navbar';

function App() {


  return (
    <div className='bg-neutral-800'>
      <div>
        <Routes>
          <Route path='/register' element={<UserRegister />} /> 
          <Route path='/login' element={<UserLogin />} /> 
          <Route path='/forgot-password' element={<ForgotPassword />} /> 
        </Routes>
      </div>

      <div> 
        <Navbar />
      </div>
    </div>
  );
}

export default App;
