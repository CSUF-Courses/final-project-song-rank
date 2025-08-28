import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import MyLists from './pages/MyTop3';
import Explore from './pages/Explore';

function App() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Router>
      <div className="card">
        <button onClick={logout} style={{ float: 'right', margin: '10px' }}>
          Logout
        </button>
        
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/my-lists" style={{ marginRight: '15px' }}>My Top 3</Link>
          <Link to="/explore">Explore</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/my-lists" replace />} />
          <Route path="/my-lists" element={<MyLists />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;