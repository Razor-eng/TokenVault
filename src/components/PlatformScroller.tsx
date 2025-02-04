import { motion } from 'framer-motion';

const platforms = [
  { name: 'Node.js', logo: '/images/node.svg' },
  { name: 'Spring Boot', logo: '/images/spring.svg' },
  { name: 'Django', logo: '/images/django.svg' },
  { name: 'Laravel', logo: '/images/laravel.svg' },
  { name: 'ASP.NET', logo: '/images/aspnet.svg' },
  { name: 'Ruby on Rails', logo: '/images/rails.svg' },
  { name: 'Express.js', logo: '/images/express.svg' },
  { name: 'FastAPI', logo: '/images/FastAPI.svg' },
];

const PlatformScroller = () => {
  return (
    <div className="relative overflow-hidden py-10">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />

      <motion.div
        className="flex space-x-8"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...platforms, ...platforms].map((platform, index) => (
          <div
            key={`${platform.name}-${index}`}
            className="flex flex-col items-center space-y-2 bg-white p-6 rounded-xl shadow-lg min-w-[160px]"
          >
            <img
              src={platform.logo}
              alt={platform.name}
              className="h-12 w-12 object-contain"
            />
            <span className="text-sm font-medium text-gray-600">{platform.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlatformScroller;