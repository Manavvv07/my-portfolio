import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Github,
  ArrowRight,
  Download,
  Mail,
  Linkedin,
  Code,
  Blocks,
  Cpu,
  LucideIcon
} from 'lucide-react';
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";

interface Technology {
  name: string
  icon: LucideIcon;
  color: string;
  gradient: string;
  borderGradient: string;
}
interface ButtonProps {
  children: React.ReactNode;
  darkMode: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  download?: boolean | string;
}

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  darkMode: boolean;
  ariaLabel?: string;
}

interface StatsCounterProps {
  label: string;
  count: number;
  suffix?: string;
  darkMode: boolean;
}

const technologies: Technology[] = [
  {
    name: 'Full Stack Dev',
    icon: Code,
    color: 'from-blue-500 to-cyan-400',
    gradient: 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20',
    borderGradient: 'border-blue-500/50'
  },
  {
    name: 'Generative AI',
    icon: Cpu,
    color: 'from-purple-500 to-pink-400',
    gradient: 'bg-gradient-to-r from-purple-500/20 to-pink-400/20',
    borderGradient: 'border-purple-500/50'
  },
  {
    name: 'UI/UX Design',
    icon: Blocks,
    color: 'from-orange-500 to-amber-400',
    gradient: 'bg-gradient-to-r from-orange-500/20 to-amber-400/20',
    borderGradient: 'border-orange-500/50'
  }
];

const Hero: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [_isImageLoaded, setIsImageLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yAnimation = useSpring(y, springConfig);
  const opacityAnimation = useSpring(opacity, springConfig);

  return (
    <motion.section
      className={`relative min-h-screen flex items-center overflow-hidden pt-20
        ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}
      style={{ opacity: opacityAnimation }}
    >
      {/* Enhanced Animated Background */}
      <AnimatedBackground darkMode={darkMode} />

      <div className="container relative z-[1] px-4 mx-auto">
        <div className="grid gap-8 items-center lg:grid-cols-2 lg:gap-20">
          {/* Left Content with Enhanced Animations */}
          <motion.div
            className="relative z-10 space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Professional Name Tag with Permanent Gradient Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              <div className={`inline-block px-6 py-3 rounded-full text-sm font-medium relative overflow-hidden
                ${darkMode
                  ? 'text-gray-200 bg-gradient-to-r from-gray-800/80 to-gray-700/80'
                  : 'text-gray-800 bg-gradient-to-r from-gray-100/80 to-white/80'}
                shadow-xl border border-gray-700/10 backdrop-blur-md`}
              >
                <span className="flex relative z-10 gap-2 items-center">
                  <Code className="w-4 h-4" />
                  Full Stack Engineer
                </span>
                <div className="absolute inset-0 bg-gradient-to-r rounded-full from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-100" />
              </div>
            </motion.div>

            {/* Enhanced Main Heading with Improved Typography - Hidden on Mobile */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight bg-clip-text leading-tight
                ${darkMode
                  ? 'text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400'
                  : 'text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700'}`}
              >
                Manav Singh
              </h1>
              <GradientText
                text="I build intelligent stuff for a complex world."
                darkMode={darkMode}
              />
            </motion.div>

            {/* Professional Description - Hidden on Mobile */}
            <motion.p
              className={`max-w-xl text-base sm:text-lg md:text-xl leading-relaxed hidden sm:block
                ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I work on AI Full Stack Developement, building scalable, production-ready solutions that solve complex problems efficiently.
              Turning caffeine and code into real-world impact, obsessed with building scalable apps, breaking limits, and learning faster than my laptop fan spins.
            </motion.p>

            {/* Enhanced Technology Stack with Improved Spacing */}
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 max-w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {technologies.map((tech) => (
                <TechBadge
                  key={tech.name}
                  {...tech}
                  darkMode={darkMode}
                />
              ))}
            </motion.div>

            {/* Professional CTA Buttons with Enhanced Responsiveness */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <PrimaryButton
                darkMode={darkMode}
                href="mailto:manavsingh29sk@gmail.com"
              >
                <Mail className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Contact Me
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.span>
              </PrimaryButton>

              <SecondaryButton
                darkMode={darkMode}
                href="/Manav_Singh_Resume.pdf"
                download
              >
                <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Download CV
              </SecondaryButton>
            </motion.div>

            {/* Professional Social Links with Improved Layout */}
            <motion.div
              className="flex flex-wrap gap-4 items-center sm:gap-6 max-w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <SocialLink
                href="https://github.com/Manavvv07"
                icon={Github}
                darkMode={darkMode}
              />
              <SocialLink
                href="https://www.linkedin.com/in/iammanavsingh"
                icon={Linkedin}
                darkMode={darkMode}
              />
              <StatsCounter label="Projects Built" count={3} darkMode={darkMode} />
              <StatsCounter label="Months of Exp" count={6} suffix="+" darkMode={darkMode} />
            </motion.div>
          </motion.div>

          {/* Enhanced Right Content with Improved Mobile Layout */}
          <motion.div
            className="relative w-full lg:w-auto mt-8 sm:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: yAnimation }}
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Refined Grid Layout for Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 p-2 sm:p-4 w-full h-full">
                {[img1, img2, img3, img4].map((image, index) => (
                  <motion.div
                    key={index}
                    className={`relative rounded-2xl overflow-hidden
                      ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'}
                      shadow-[0_8px_32px_rgba(0,0,0,0.2)]
                      backdrop-blur-lg border border-gray-700/10
                      ${index % 2 === 0 ? 'translate-y-2 sm:translate-y-4' : '-translate-y-2 sm:-translate-y-4'}`}
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.8,
                      rotate: index % 2 === 0 ? -3 : 3
                    }}
                    animate={{
                      opacity: 1,
                      y: index % 2 === 0 ? 8 : -8,
                      scale: 1,
                      rotate: index % 2 === 0 ? -3 : 3
                    }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <div className="relative w-full h-full aspect-[4/5]">
                      <img
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="object-cover w-full h-full"
                        loading="eager"
                        onLoad={() => setIsImageLoaded(true)}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Refined Gradient Orbs */}
              <div className="absolute -top-40 -right-20 w-96 h-96 rounded-full blur-[120px] bg-blue-500/10 animate-pulse-slow" />
              <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full blur-[120px] bg-purple-500/10 animate-pulse-slow" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Enhanced Subcomponents with TypeScript
const AnimatedBackground: React.FC<{ darkMode: boolean }> = ({ darkMode }) => (
  <div className="overflow-hidden absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/10" />
    <motion.div
      className="absolute inset-0"
      animate={{
        background: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0)'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
    <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
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
);

const GradientText: React.FC<{ text: string; darkMode: boolean }> = ({ text, darkMode }) => (
  <div className={`text-xl md:text-2xl font-medium bg-clip-text text-transparent
    ${darkMode
      ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
      : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'}`}
  >
    {text}
  </div>
);

const TechBadge: React.FC<Technology & { darkMode: boolean }> = ({
  name,
  icon: Icon,
  color,
  gradient,
  borderGradient,
  darkMode
}) => (
  <motion.div
    className={`relative group`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className={`
      inline-flex items-center px-4 py-2 rounded-full space-x-2
      ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} 
      backdrop-blur-md border-2 ${borderGradient}
      ${gradient} shadow-lg transition-all duration-300
      group-hover:shadow-xl group-hover:shadow-${color.split('-')[1]}/20
    `}>
      <div className={`flex justify-center items-center w-6 h-6 bg-gradient-to-r rounded-full ${color}`}>
        <Icon className="w-3 h-3 text-white" />
      </div>
      <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {name}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r rounded-full opacity-0 transition-opacity duration-500 from-white/0 via-white/20 to-white/0 group-hover:opacity-100 animate-shine" />
    </div>
  </motion.div>
);

const PrimaryButton: React.FC<ButtonProps> = ({ children, darkMode, href }) => (
  <motion.a
    href={href}
    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center relative overflow-hidden
      ${darkMode
        ? 'text-gray-900 bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-white'
        : 'text-white bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900'
      } shadow-lg shadow-gray-900/10 group`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="flex relative z-10 items-center">
      {children}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 from-blue-500/0 via-blue-500/30 to-blue-500/0 group-hover:opacity-100 animate-shine" />
  </motion.a>
);

const SecondaryButton: React.FC<ButtonProps> = ({ children, darkMode, href, download }) => (
  <motion.a
    href={href}
    download={download}
    rel="noopener noreferrer"
    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center relative overflow-hidden
      ${darkMode
        ? 'text-white bg-gray-800 hover:bg-gray-700'
        : 'text-gray-900 bg-gray-100 hover:bg-gray-200'
      } shadow-lg shadow-gray-900/10 group border border-gray-700/10`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="flex relative z-10 items-center">
      {children}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 from-gray-500/0 via-gray-500/10 to-gray-500/0 group-hover:opacity-100 animate-shine" />
  </motion.a>
);

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, darkMode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-3 rounded-xl relative overflow-hidden group
      ${darkMode
        ? 'text-gray-300 bg-gray-800 hover:text-white'
        : 'text-gray-600 bg-gray-100 hover:text-gray-900'
      }`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <span className="relative z-10">
      <Icon className="w-5 h-5" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 from-blue-500/0 via-blue-500/20 to-blue-500/0 group-hover:opacity-100 animate-shine" />
  </motion.a>
);

const StatsCounter: React.FC<StatsCounterProps> = ({ label, count, suffix = '', darkMode }) => (
  <motion.div
    className={`text-center p-3 rounded-xl relative overflow-hidden group
      ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
    whileHover={{ scale: 1.1 }}
  >
    <div className={`text-xl font-bold relative z-10 ${darkMode ? 'text-white' : 'text-gray-900'
      }`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {count}{suffix}
      </motion.span>
    </div>
    <div className={`text-sm relative z-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
      {label}
    </div>
    <div className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 from-blue-500/0 via-blue-500/10 to-blue-500/0 group-hover:opacity-100 animate-shine" />
  </motion.div>
);

export default React.memo(Hero);