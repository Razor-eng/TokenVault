import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-8 h-8">
        <motion.div
          className="absolute inset-0 bg-indigo-600 rounded-lg"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-1 bg-white rounded-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-indigo-600">
            T
          </span>
        </motion.div>
      </div>
      <motion.span
        className="text-xl font-display font-bold text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        TokenVault
      </motion.span>
    </motion.div>
  );
};

export default Logo;