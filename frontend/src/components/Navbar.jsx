import { Link, useLocation } from 'react-router-dom';
import { Terminal, BookOpen, FileText, Settings, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import AboutMe from './AboutMe';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Notes', path: '/notes', icon: <BookOpen className="w-5 h-5 mr-1" /> },
    { name: 'Blogs', path: '/blogs', icon: <FileText className="w-5 h-5 mr-1" /> },
    { name: 'Terminal', path: '/terminal', icon: <Terminal className="w-5 h-5 mr-1" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-neo-white border-b-4 border-neo-black shadow-brutal">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-neo-blue text-white p-2 border-2 border-neo-black transform group-hover:-rotate-6 transition-transform">
              <Terminal className="w-8 h-8" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-neo-black">NetNotes</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center text-lg font-bold border-b-4 transition-colors ${
                  isActive(link.path) ? 'border-neo-blue text-neo-blue' : 'border-transparent hover:border-neo-black text-neo-black'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="flex items-center text-lg font-bold border-b-4 border-transparent hover:border-neo-black transition-colors text-neo-black"
            >
              <User className="w-5 h-5 mr-1" />
              About
            </button>

            <Link to="/admin" className="ml-4 bg-neo-yellow brutal-btn py-2 px-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" /> Admin
            </Link>
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 border-2 border-neo-black bg-neo-yellow shadow-brutal">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-neo-black bg-neo-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-4 border-b-2 border-neo-black text-xl font-bold hover:bg-neo-blue hover:text-white"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-4 text-xl font-bold bg-neo-yellow border-b-2 border-neo-black"
            >
              <Settings className="w-5 h-5 mr-2" /> Admin
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsAboutOpen(true);
              }}
              className="w-full flex items-center px-3 py-4 text-xl font-bold bg-neo-blue text-white border-b-2 border-neo-black"
            >
              <User className="w-5 h-5 mr-2" /> About Me
            </button>
          </div>
        </div>
      )}
      <AboutMe isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </nav>
  );
};


export default Navbar;
