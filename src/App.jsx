//import './App.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({
            userData: {
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            }
          }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);




  return !loading ? (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center">
      <div className='w-full block'>
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>

    </div>
  ) : null
}

export default App
