import { motion } from 'framer-motion';
import CodeWindow from '../components/CodeWindow';

const NodeJWT = () => {
  const installationCode = `npm install jsonwebtoken
# or
yarn add jsonwebtoken`;

  const implementationCode = `const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: '1h' }
  );
};

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};`;

  const loginRouteCode = `app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Verify user credentials
  const user = await User.findOne({ email });
  if (!user || !await user.comparePassword(password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate token
  const token = generateToken(user);
  res.json({ token });
});`;

  const protectedRouteCode = `app.get('/protected', verifyToken, (req, res) => {
  // Access user info from req.user
  res.json({ 
    message: 'Protected route accessed successfully',
    user: req.user 
  });
});`;

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
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
          JWT Implementation in Node.js
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive guide to implementing JWT authentication in your Node.js applications
        </p>
      </motion.div>

      <div className="space-y-12">
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-display font-semibold mb-6">Installation</h2>
          <CodeWindow
            title="terminal"
            language="bash"
            code={installationCode}
          />
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-display font-semibold mb-6">Core Implementation</h2>
          <p className="text-gray-600 mb-4">
            Here's a complete example of JWT implementation in Node.js including token generation and verification:
          </p>
          <CodeWindow
            title="jwt.js"
            language="javascript"
            code={implementationCode}
          />
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-display font-semibold mb-6">Usage Examples</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Login Route</h3>
              <CodeWindow
                title="routes/auth.js"
                language="javascript"
                code={loginRouteCode}
              />
            </div>

            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Protected Route</h3>
              <CodeWindow
                title="routes/protected.js"
                language="javascript"
                code={protectedRouteCode}
              />
            </div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-display font-semibold mb-6">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Security</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Store JWT secret in environment variables</li>
                <li>• Set appropriate token expiration time</li>
                <li>• Use HTTPS in production</li>
                <li>• Implement proper error handling</li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Implementation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Implement token refresh mechanism</li>
                <li>• Handle token revocation</li>
                <li>• Use proper payload structure</li>
                <li>• Validate token signature</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default NodeJWT;