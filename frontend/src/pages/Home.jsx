import HeroSection from '../components/HeroSection';
import { BookOpen, Shield, Globe, Cpu, Github, Instagram, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.jpg';

const Home = () => {
  const features = [
    { title: 'Basics & OSI', icon: <BookOpen className="w-8 h-8 mb-4" />, color: 'bg-neo-yellow text-neo-black' },
    { title: 'Protocols', icon: <Globe className="w-8 h-8 mb-4" />, color: 'bg-neo-blue text-white' },
    { title: 'Security', icon: <Shield className="w-8 h-8 mb-4" />, color: 'bg-neo-pink text-white' },
    { title: 'Routing', icon: <Cpu className="w-8 h-8 mb-4" />, color: 'bg-neo-green text-neo-black' },
  ];

  return (
    <div>
      <HeroSection />

      {/* About Me Section in "Header Area" */}
      <section className="pb-16 pt-8">
        <div className="brutal-card bg-neo-white p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-neo-yellow border-l-4 border-b-4 border-neo-black transform translate-x-4 -translate-y-4"></div>
          
          <div className="relative group">
            <div className="w-48 h-48 md:w-56 md:h-56 border-8 border-neo-black shadow-brutal overflow-hidden transform group-hover:-rotate-3 transition-transform">
              <img 
                src={profileImg} 
                alt="Dharmchand Meghwal" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-neo-green text-neo-black px-4 py-1 border-4 border-neo-black font-black text-sm uppercase shadow-brutal-sm">
              Author
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-none mb-2 text-neo-black">
                Dharmchand Meghwal
              </h2>
              <div className="inline-block bg-neo-blue text-white px-4 py-1 border-2 border-neo-black font-bold text-sm uppercase shadow-brutal-sm">
                Network Infrastructure Specialist
              </div>
            </div>
            
            <p className="text-xl font-bold leading-relaxed border-l-8 border-neo-pink pl-6 py-2 bg-neo-card/50 shadow-brutal-sm text-neo-black">
              🏗️ Building resilient backbone infrastructures. | Specialist in Routing, Switching, and Network Security. | CCNA/CCNP | I turn coffee into uptime. ☕
            </p>

            <div className="flex gap-4 pt-2">
              <a 
                href="https://github.com/technodharam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="brutal-btn bg-neo-black text-white p-3 flex items-center gap-2 text-sm"
              >
                <Github className="w-5 h-5" /> GitHub <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://www.instagram.com/technodharam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="brutal-btn bg-[#E1306C] text-white p-3 flex items-center gap-2 text-sm"
              >
                <Instagram className="w-5 h-5" /> Instagram <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="flex items-end mb-10 border-b-4 border-neo-black pb-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-neo-black">What you'll learn</h2>
          <div className="w-16 h-16 bg-neo-yellow border-4 border-neo-black ml-4 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-neo-black rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className={`brutal-card p-6 ${feature.color} flex flex-col items-center text-center`}>
              {feature.icon}
              <h3 className="text-2xl font-bold uppercase">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="brutal-card bg-neo-purple text-white p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl mb-8 md:mb-0">
              <h2 className="text-4xl font-black mb-4 uppercase">Stuck on a concept?</h2>
              <p className="text-xl font-medium mb-6">Our AI Chatbot is trained on thousands of networking queries. Ask it anything from "How does DHCP work?" to "Why is my ping failing?".</p>
              <button className="brutal-btn bg-neo-yellow text-neo-black">
                Try the Chatbot (Bottom Right)
              </button>
            </div>
            <div className="w-32 h-32 bg-neo-white rounded-full border-8 border-neo-black shadow-brutal flex items-center justify-center transform rotate-12">
              <span className="text-5xl">🤖</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
