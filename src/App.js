import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';


// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


// Context 
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import NewPost from './pages/NewPost/NewPost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

// pages

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth]) // Loga

  if (loadingUser) {
    return <p>Carregando perfil</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />}>Home</Route>
              <Route path='/about' element={<About />}>Sobre</Route>
              <Route path='/search' element={<Search />}>Pesquisar</Route>
              <Route path='/posts/:id' element={<Post />}>Post </Route>
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/posts/new" />}></Route>
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/dashboard" />}></Route>
              <Route path='/posts/new' element={user ? <NewPost /> : <Navigate to="/login" />}></Route>
              <Route path='/posts/edit/:id' element={user ? <EditPost /> :  <Navigate to="/login" />}></Route>
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
