import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="absolute inset-0 bg-grid-white/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            One Click Preparation to Your Dream Job
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-white/90 max-w-2xl mx-auto"
          >
            Interview Genie helps you prepare for your dream job interviews with AI-powered mock interviews, 
            personalized feedback, and comprehensive preparation tools.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button
              onClick={() => navigate('/signup')}
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate('/signin')}
              variant="outline"
              className="text-white border-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full"
            >
              Sign In
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Hero; 