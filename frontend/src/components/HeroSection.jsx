import { Link } from 'react-router-dom';
import { ArrowRight, TerminalSquare, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-8">
          <div className="inline-block bg-neo-green text-neo-black px-4 py-1 border-2 border-neo-black shadow-brutal font-bold text-sm transform -rotate-2">
            Welcome to the Grid
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter uppercase text-neo-black">
            IT Networking<br/>
            <span className="text-neo-blue bg-neo-yellow px-2 border-4 border-neo-black shadow-brutal inline-block mt-2 transform rotate-1 text-neo-black">Explained</span><br/>
            Brutally Simple.
          </h1>
          <p className="text-xl font-medium border-l-8 border-neo-black pl-4 py-2 bg-neo-card max-w-lg text-neo-black">
            Master the protocols, understand the OSI model, and troubleshoot like a pro without the fluff.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/notes" className="brutal-btn bg-neo-blue text-white flex items-center text-lg">
              Start Learning <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/terminal" className="brutal-btn bg-neo-card text-neo-black flex items-center text-lg">
              <TerminalSquare className="mr-2 w-5 h-5" /> Try Terminal
            </Link>
          </div>
        </div>

        {/* Visual Element */}
        <div className="relative hidden lg:block">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neo-purple border-4 border-neo-black shadow-brutal rounded-full transform translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-neo-pink border-4 border-neo-black shadow-brutal transform rotate-45"></div>
          
          {/* Main card */}
          <div className="relative z-10 brutal-card bg-neo-yellow p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 mx-auto max-w-md">
            <div className="flex justify-between items-center mb-6 border-b-4 border-neo-black pb-4">
              <div className="flex space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-neo-black bg-neo-pink"></div>
                <div className="w-4 h-4 rounded-full border-2 border-neo-black bg-neo-green"></div>
              </div>
              <Zap className="w-8 h-8" />
            </div>
            <pre className="font-mono text-sm sm:text-base font-bold text-neo-black">
              <code>
<span className="text-neo-blue">C:\&gt;</span> ping master.networking<br/><br/>
Pinging master.networking [192.168.1.1]<br/>
with 32 bytes of data:<br/><br/>
Reply from 192.168.1.1: time&lt;1ms<br/>
Reply from 192.168.1.1: time&lt;1ms<br/><br/>
Ping statistics:<br/>
  Packets: Sent = 2, Received = 2<br/>
  0% packet loss<br/>
              </code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
