import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
