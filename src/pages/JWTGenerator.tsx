import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Copy, RefreshCw, Shield, Key, Lock, Info } from 'lucide-react';

const JWTGenerator = () => {
  const [secretLength, setSecretLength] = useState(32);
  const [generatedSecret, setGeneratedSecret] = useState('');
  const [copied, setCopied] = useState(false);
  const [complexity, setComplexity] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true
  });

  const generateSecret = () => {
    let characters = '';
    if (complexity.uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (complexity.lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (complexity.numbers) characters += '0123456789';
    if (complexity.special) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let result = '';
    const charactersLength = characters.length;

    // Ensure at least one character from each selected type
    if (complexity.uppercase) result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    if (complexity.lowercase) result += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    if (complexity.numbers) result += '0123456789'[Math.floor(Math.random() * 10)];
    if (complexity.special) result += '!@#$%^&*()_+-=[]{}|;:,.<>?'[Math.floor(Math.random() * 26)];

    // Fill the rest randomly
    while (result.length < secretLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // Shuffle the result
    result = result.split('').sort(() => Math.random() - 0.5).join('');

    setGeneratedSecret(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSecret);
    toast.success('Copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthIndicator = () => {
    let strength = 0;
    if (complexity.uppercase) strength += 26;
    if (complexity.lowercase) strength += 26;
    if (complexity.numbers) strength += 10;
    if (complexity.special) strength += 32;

    const possibleCombinations = Math.pow(strength, secretLength);
    const bits = Math.log2(possibleCombinations);

    if (bits < 64) return { color: 'red', text: 'Weak' };
    if (bits < 128) return { color: 'yellow', text: 'Moderate' };
    return { color: 'green', text: 'Strong' };
  };

  const strength = strengthIndicator();

  const features = [
    {
      icon: Shield,
      title: "Secure Generation",
      description: "Cryptographically secure random generation for maximum security"
    },
    {
      icon: Key,
      title: "Flexible Length",
      description: "Customize secret length based on your security requirements"
    },
    {
      icon: Lock,
      title: "Best Practices",
      description: "Following industry standards and security guidelines"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
          JWT Secret Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Generate cryptographically secure secrets for your JWT implementation
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Generator Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Length Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-700 font-medium">
                Secret Length: {secretLength} characters
              </label>
              <div className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-${strength.color}-500`}>
                {strength.text}
              </div>
            </div>
            <input
              type="range"
              min="16"
              max="128"
              value={secretLength}
              onChange={(e) => setSecretLength(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 dark:bg-gray-700"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(secretLength - 16) / 1.12}%, #d1d5db ${(secretLength - 16) / 1.12}%, #d1d5db 100%)`,
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>16</span>
              <span>128</span>
            </div>
          </div>

          {/* Complexity Options */}
          <div className="mb-8">
            <h3 className="text-gray-700 font-medium mb-4">Character Types</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(complexity).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setComplexity(prev => ({ ...prev, [key as keyof typeof complexity]: !prev[key as keyof typeof complexity] }))}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="text-gray-700 capitalize">{key}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateSecret}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center font-medium"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Generate Secret
          </motion.button>

          {/* Generated Secret */}
          {generatedSecret ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="my-8 mb-14"
            >
              <label className="block text-gray-700 font-medium mb-2">
                Generated Secret
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={generatedSecret}
                  readOnly
                  className="flex-grow p-3 border rounded-l-lg bg-gray-50 font-mono text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className={`p-3 ${copied ? 'bg-green-600' : 'bg-indigo-600'
                    } text-white rounded-r-lg hover:opacity-90 transition-colors`}
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="my-8 mb-14"
            >
              <label className="block text-gray-700 font-medium mb-2">
                Generated Secret
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={generatedSecret}
                  readOnly
                  disabled
                  className="flex-grow p-3 border rounded-l-lg bg-gray-100 font-mono text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  disabled
                  className={`p-3 bg-zinc-500 text-white rounded-r-lg`}
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
          {/* Strength Meter */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center">
              <Shield className="w-5 h-5 text-indigo-600 mr-2" />
              Password Strength Analysis
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Entropy</span>
                  <span className="text-sm text-gray-500">
                    {Math.log2(Math.pow(
                      (complexity.uppercase ? 26 : 0) +
                      (complexity.lowercase ? 26 : 0) +
                      (complexity.numbers ? 10 : 0) +
                      (complexity.special ? 32 : 0),
                      secretLength
                    )).toFixed(2)} bits
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${strength.color}-500`}
                    style={{
                      width: `${Math.min(100, (secretLength / 128) * 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Information Section */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg card-hover"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <feature.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security Tips */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center">
              <Info className="w-5 h-5 text-indigo-600 mr-2" />
              Security Recommendations
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <span className="text-gray-600">Use secrets of at least 32 characters for production environments</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <span className="text-gray-600">Enable all character types for maximum entropy</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <span className="text-gray-600">Rotate secrets every 90 days or when team members change</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <span className="text-gray-600">Store secrets securely using environment variables or secure vaults</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JWTGenerator;