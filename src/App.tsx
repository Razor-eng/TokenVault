import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NodeJWT from './pages/NodeJWT';
import SpringBootJWT from './pages/SpringBootJWT';
import JWTGenerator from './pages/JWTGenerator';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/node" element={<NodeJWT />} />
            <Route path="/spring-boot" element={<SpringBootJWT />} />
            <Route path="/generator" element={<JWTGenerator />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;