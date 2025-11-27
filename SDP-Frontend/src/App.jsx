import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import MainNavbar from './components/MainNavbar';
import AdminNavbar from './components/AdminNavbar';
import ManagerNavbar from './components/ManagerNavbar';
import CustomerNavbar from './components/CustomerNavbar';

function App() {
  const { user } = useAuth();
  if (!user) return <BrowserRouter><MainNavbar /></BrowserRouter>;
  switch (user.role) {
    case 'ADMIN': return <BrowserRouter><AdminNavbar /></BrowserRouter>;
    case 'MANAGER': return <BrowserRouter><ManagerNavbar /></BrowserRouter>;
    case 'CUSTOMER': return <BrowserRouter><CustomerNavbar /></BrowserRouter>;
    default: return <BrowserRouter><MainNavbar /></BrowserRouter>;
  }
}
export default App;