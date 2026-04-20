import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatbotWidget from './components/ChatbotWidget';
import Home from './pages/Home';
import NotesPage from './pages/NotesPage';
import BlogsPage from './pages/BlogsPage';
import TerminalSimulator from './components/TerminalSimulator';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-neo-yellow rounded-full border-4 border-neo-black -z-10 mix-blend-multiply opacity-50"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-neo-pink border-4 border-neo-black -z-10 transform rotate-12 mix-blend-multiply opacity-50"></div>
        
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/terminal" element={<div className="max-w-4xl mx-auto"><h1 className="text-4xl font-bold mb-6 border-b-4 border-neo-black pb-2 inline-block">WEB TERMINAL</h1><TerminalSimulator /></div>} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <footer className="border-t-4 border-neo-black bg-neo-yellow py-6 mt-12">
          <div className="container mx-auto px-4 text-center font-bold">
            <p className="text-xl">© 2026 NetNotes. Built Brutally Simple.</p>
          </div>
        </footer>

        <ChatbotWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
