import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    title: "Sign Up & Create Profile",
    description: "Create your account and build your professional profile with your experience, skills, and career goals."
  },
  {
    title: "Choose Your Target Role",
    description: "Select the job role and company you're preparing for. Our AI will customize your preparation accordingly."
  },
  {
    title: "Practice with AI Interviews",
    description: "Engage in realistic mock interviews with our AI interviewer, tailored to your target role and company."
  },
  {
    title: "Get Personalized Feedback",
    description: "Receive detailed feedback on your performance, including areas of improvement and strengths."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            How Interview Genie Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Get interview-ready in just a few simple steps
          </motion.p>
        </div>

        <div className="mt-20">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-between">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white"
                >
                  <span className="text-lg font-semibold">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative p-6 bg-white rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="mt-4 text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 