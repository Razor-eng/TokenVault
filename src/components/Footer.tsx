import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JWT Guide</h3>
            <p className="text-gray-400">
              Your comprehensive guide to JWT implementation across different platforms.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://jwt.io" className="hover:text-white transition-colors">JWT.io</a></li>
              <li><a href="https://github.com/auth0/node-jsonwebtoken" className="hover:text-white transition-colors">JWT for Node.js</a></li>
              <li><a href="https://github.com/jwtk/jjwt" className="hover:text-white transition-colors">JJWT for Java</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JWT Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;