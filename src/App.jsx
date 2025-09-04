import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/' element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
