import { useState, useRef, useEffect } from 'react';
import { TerminalSquare, Send } from 'lucide-react';

const TerminalSimulator = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'NetOS [Version 10.0.19045.2846]' },
    { type: 'output', content: '(c) NetNotes Corporation. All rights reserved.' },
    { type: 'output', content: ' ' },
    { type: 'output', content: 'Type "help" for a list of simulated commands.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const newHistory = [...history, { type: 'input', content: `C:\\Users\\Student> ${cmd}` }];
    
    // Simulate processing
    const args = cmd.toLowerCase().split(' ');
    const command = args[0];

    setTimeout(() => {
      let output = '';
      switch (command) {
        case 'help':
          output = 'Supported commands: PING, IPCONFIG, TRACERT, NETSTAT, CLS';
          break;
        case 'cls':
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'ping':
          if (args.length > 1) {
            output = `Pinging ${args[1]} with 32 bytes of data:\nReply from ${args[1]}: time<1ms\nReply from ${args[1]}: time<1ms\nReply from ${args[1]}: time<1ms\nReply from ${args[1]}: time<1ms\n\nPing statistics for ${args[1]}:\n    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`;
          } else {
            output = 'Usage: ping <target_name>';
          }
          break;
        case 'ipconfig':
          output = 'Windows IP Configuration\n\nEthernet adapter Ethernet0:\n\n   Connection-specific DNS Suffix  . : localdomain\n   IPv4 Address. . . . . . . . . . . : 192.168.1.100\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1';
          break;
        case 'tracert':
          if (args.length > 1) {
            output = `Tracing route to ${args[1]} over a maximum of 30 hops:\n\n  1    <1 ms    <1 ms    <1 ms  192.168.1.1\n  2    10 ms     9 ms    12 ms  10.0.0.1\n  3    15 ms    14 ms    15 ms  ${args[1]}\n\nTrace complete.`;
          } else {
            output = 'Usage: tracert <target_name>';
          }
          break;
        case 'netstat':
          output = 'Active Connections\n\n  Proto  Local Address          Foreign Address        State\n  TCP    192.168.1.100:443      104.21.15.5:443        ESTABLISHED\n  TCP    192.168.1.100:80       192.0.2.1:80           TIME_WAIT';
          break;
        default:
          output = `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
      }
      setHistory(prev => [...prev, { type: 'output', content: output }]);
    }, 400);

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="brutal-card bg-neo-black text-neo-green font-mono p-4 flex flex-col h-[500px] border-4 border-neo-black shadow-brutal-lg">
      <div className="flex items-center justify-between mb-4 border-b-2 border-neo-green pb-2">
        <div className="flex items-center text-white">
          <TerminalSquare className="w-5 h-5 mr-2 text-neo-yellow" />
          <span className="font-bold">Command Prompt Simulator</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-neo-pink rounded-full"></div>
          <div className="w-3 h-3 bg-neo-yellow rounded-full"></div>
          <div className="w-3 h-3 bg-neo-green rounded-full"></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto whitespace-pre-wrap pb-4">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-white' : 'text-neo-green'}`}>
            {line.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleCommand} className="flex mt-2">
        <span className="text-white mr-2">C:\Users\Student&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default TerminalSimulator;
