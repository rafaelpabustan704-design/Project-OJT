import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Portfolio from './pages/public/Portfolio';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioProvider>
          <ToastProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </ToastProvider>
        </PortfolioProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
