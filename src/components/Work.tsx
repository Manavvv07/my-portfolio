import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from './SectionHeader';
import { Code2, Database, Brain, Paintbrush } from 'lucide-react';

const WorkSection = ({ darkMode }: { darkMode: boolean }) => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const services = [
    {
      id: 1,
      title: 'Frontend Dev',
      description: 'Building modern, responsive interfaces with React and Next.js',
      icon: <Code2 size={24} />,
      color: darkMode ? '#22d3ee' : '#06b6d4'
    },
    {
      id: 2,
      title: 'Backend Dev',
      description: 'Creating fast, secure APIs and database systems',
      icon: <Database size={24} />,
      color: darkMode ? '#f472b6' : '#ec4899'
    },
    {
      id: 3,
      title: 'Generative AI',
      description: 'Implementing AI solutions for automated applications',
      icon: <Brain size={24} />,
      color: darkMode ? '#a78bfa' : '#8b5cf6'
    },
    {
      id: 4,
      title: 'Design To Code',
      description: 'Converting Figma designs into exact code replicas',
      icon: <Paintbrush size={24} />,
      color: darkMode ? '#fb923c' : '#f97316'
    },
  ];

  return (
    <motion.section
      id="work"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className={`relative min-h-screen flex items-center overflow-hidden py-16 sm:py-20
        ${darkMode
          ? 'bg-gradient-to-br via-gray-900 from-gray-950 to-gray-950'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 opacity-30 ${darkMode ? 'bg-blue-900/10' : 'bg-blue-100/20'}`}
          animate={{
            background: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0)'],
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        />
        <svg className="absolute top-0 left-0 w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={darkMode ? '#ffffff10' : '#00000010'}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <SectionHeader
          title="What I Do"
          className={`text-center mb-8 sm:mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}
        />
        <motion.div
          className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              darkMode={darkMode}
              index={index}
              isHovered={hoveredService === service.id}
              setHoveredService={setHoveredService}
            />
          ))}
        </motion.div>
      </div>

      {/* Refined Gradient Orbs - matching Hero style */}
      <div className="absolute -top-20 -right-10 sm:-top-40 sm:-right-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] sm:blur-[120px] bg-blue-500/10 animate-pulse-slow" />
      <div className="absolute -bottom-20 -left-10 sm:-bottom-40 sm:-left-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] sm:blur-[120px] bg-purple-500/10 animate-pulse-slow" />
    </motion.section>
  );
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
    }
  }
};

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

const ServiceCard = ({ service, darkMode, isHovered, setHoveredService }: {
  service: any,
  darkMode: boolean,
  index: number,
  isHovered: boolean,
  setHoveredService: React.Dispatch<React.SetStateAction<number | null>>
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }}
    onHoverStart={() => setHoveredService(service.id)}
    onHoverEnd={() => setHoveredService(null)}
    className={`relative flex flex-col items-center p-6 sm:p-8 space-y-4 sm:space-y-6 transition-all duration-300 ease-in-out rounded-xl sm:rounded-2xl h-full
      ${darkMode
        ? 'bg-gray-800/90 hover:bg-gray-800/95'
        : 'bg-white/90 hover:bg-white/95'
      } backdrop-blur-lg border border-gray-700/10 shadow-[0_4px_16px_rgba(0,0,0,0.1)]`}
    style={{
      boxShadow: isHovered
        ? `0 8px 12px -3px ${service.color}20, 0 4px 6px -2px ${service.color}10`
        : 'none'
    }}
  >
    <Icon icon={service.icon} color={service.color} isHovered={isHovered} />
    <motion.h3
      className={`text-xl sm:text-2xl font-semibold text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
      variants={textVariants}
    >
      {service.title}
    </motion.h3>
    <motion.p
      className={`text-base sm:text-lg text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
      variants={textVariants}
    >
      {service.description}
    </motion.p>
    {isHovered && <Particles color={service.color} />}
  </motion.div>
);

const Icon = ({ icon, color, isHovered }: { icon: React.ReactNode, color: string, isHovered: boolean }) => {
  return (
    <motion.div
      className="flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl backdrop-blur-sm"
      style={{
        backgroundColor: `${color}15`,
        border: `2px solid ${color}30`,
        opacity: isHovered ? 1 : 0.9,
        color: color
      }}
      whileHover={{
        scale: 1.05,
        rotate: 5,
        transition: { type: "spring", stiffness: 300, damping: 10 }
      }}
    >
      {React.cloneElement(icon as React.ReactElement<any>, {
        size: typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 28
      })}
    </motion.div>
  );
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

const Particles = ({ color }: { color: string }) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: color,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            },
          }}
        />
      ))}
    </motion.div>
  );
};

export default WorkSection;