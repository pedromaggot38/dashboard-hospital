import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

function App() {
  return (
    <>
      <div className='flex min-h-screen items-center justify-center bg-gray-400'>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path='/' element={<AuthPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
