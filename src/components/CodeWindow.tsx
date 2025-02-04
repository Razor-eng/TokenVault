import React from 'react';
import { Copy, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface CodeWindowProps {
  title?: string;
  language: string;
  code: string;
}

const CodeWindow: React.FC<CodeWindowProps> = ({ title, language, code }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <motion.div
      className="rounded-lg overflow-hidden bg-gray-900 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {title && (
            <div className="flex items-center text-gray-400 text-sm">
              <Terminal className="w-4 h-4 mr-2" />
              <span>{title}</span>
            </div>
          )}
        </div>
        <button
          onClick={copyCode}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-gray-300 font-mono text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  );
};

export default CodeWindow;