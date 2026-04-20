import { Github, Instagram, X, ExternalLink } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const AboutMe = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-neo-black/50 backdrop-blur-sm">
      <div className="relative bg-neo-white border-4 border-neo-black shadow-brutal-lg max-w-md w-full animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-neo-yellow p-4 border-b-4 border-neo-black flex justify-between items-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-neo-black">About Me</h2>
          <button 
            onClick={onClose}
            className="p-1 border-2 border-neo-black bg-neo-card hover:bg-neo-red hover:text-white transition-colors shadow-brutal-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 border-4 border-neo-black shadow-brutal overflow-hidden mb-4 transform hover:scale-105 transition-transform">
              <img 
                src={profileImg} 
                alt="Dharmchand Meghwal" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-black text-neo-black mb-1">Dharmchand Meghwal</h3>
            <div className="bg-neo-blue text-white px-3 py-1 text-sm font-bold border-2 border-neo-black shadow-brutal-sm">
              Network Engineer
            </div>
          </div>

          <div className="bg-neo-card border-4 border-neo-black p-4 mb-6 shadow-brutal-sm relative">
            <div className="absolute -top-3 -left-3 bg-neo-green text-neo-black px-2 border-2 border-neo-black font-bold text-xs uppercase">Bio</div>
            <p className="font-bold text-neo-black leading-relaxed">
              🏗️ Building resilient backbone infrastructures. | Specialist in Routing, Switching, and Network Security. | CCNA/CCNP | I turn coffee into uptime. ☕
            </p>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            <a 
              href="https://github.com/technodharam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-neo-black text-neo-white p-3 border-2 border-neo-black hover:bg-neo-white hover:text-neo-black transition-all shadow-brutal-sm group"
            >
              <Github className="w-5 h-5 group-hover:scale-110" />
              <span className="font-black uppercase text-sm">GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
            <a 
              href="https://www.instagram.com/technodharam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-[#E1306C] text-white p-3 border-2 border-neo-black hover:bg-neo-white hover:text-[#E1306C] transition-all shadow-brutal-sm group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110" />
              <span className="font-black uppercase text-sm">Instagram</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-4 border-neo-black bg-neo-white text-center italic font-bold text-sm text-neo-black">
          "Simplicity is the ultimate sophistication in networking."
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
