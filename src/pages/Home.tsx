import { Link } from 'react-router-dom';
import { Shield, Server, Key, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PlatformScroller from '../components/PlatformScroller';
import CodeWindow from '../components/CodeWindow';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home = () => {
  const features = [
    {
      title: "Secure by Default",
      description: "Built-in security best practices and industry-standard encryption",
      icon: Shield
    },
    {
      title: "Cross-Platform",
      description: "Seamless integration with Node.js, Spring Boot, and more",
      icon: Server
    },
    {
      title: "Developer First",
      description: "Comprehensive documentation and easy-to-follow examples",
      icon: Key
    }
  ];

  const benefits = [
    "Enhanced security with JWT authentication",
    "Scalable and stateless authentication",
    "Cross-platform compatibility",
    "Easy integration with existing systems",
    "Comprehensive security features",
    "Modern development practices"
  ];

  const popularApps = [
    { name: 'Spotify', logo: '/images/spotify.png' },
    { name: 'Auth0', logo: '/images/auth0.png' },
    { name: 'Microsoft', logo: '/images/microsoft.png' },
    { name: 'Okta', logo: '/images/okta.png' },
  ];

  const sampleCode = `const jwt = require('jsonwebtoken');

// Generate a token
const token = jwt.sign(
  { userId: '123', role: 'admin' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify a token
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
} catch (err) {
  console.error('Invalid token');
}`;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold mb-6"
              variants={fadeInUp}
            >
              Secure Your Apps with{' '}
              <span className="gradient-text">Modern Authentication</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Comprehensive guides and tools for implementing JWT across different platforms.
              Build secure, scalable applications with industry best practices.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link
                to="/generator"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition-colors"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Scroller Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Supported Platforms
            </h2>
          </motion.div>
          <PlatformScroller />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern development practices and security in mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white p-8 rounded-xl shadow-lg card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-indigo-600 mb-4">
                  <feature.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Simple to Implement
            </h2>
            <p className="text-xl text-gray-600">
              Just a few lines of code to get started
            </p>
          </motion.div>
          <CodeWindow
            title="example.js"
            language="javascript"
            code={sampleCode}
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">
                Why Choose TokenVault?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <CheckCircle className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=80"
                alt="Developer working"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Trusted By Industry Leaders
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {popularApps.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-center"
              >
                <img
                  src={app.logo}
                  alt={app.name}
                  className="h-12 object-contain"
                  loading='lazy'
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust TokenVault for their authentication needs.
          </p>
          <Link
            to="/generator"
            target='_blank'
            className="inline-flex items-center px-8 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            Try JWT Generator
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;