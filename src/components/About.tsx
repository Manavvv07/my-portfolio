import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { RiTwitterXFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { FaGithub, FaInstagram, FaJava } from 'react-icons/fa';
import { IoLogoFirebase } from 'react-icons/io5';
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiMysql,
  SiFlutter,
  SiGithub,
} from 'react-icons/si';
import { MdOutlineMailOutline } from 'react-icons/md';
import SectionHeader from './SectionHeader';
import img from '@/images/event.jpg'; // Corrected Path

// --- TYPE DEFINITIONS ---
interface AboutSectionProps {
  darkMode: boolean;
}

interface ProfileImageProps {
  darkMode: boolean;
}

interface SocialIconsProps {
  darkMode: boolean;
}

interface SocialIcon {
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  color: string;
}

interface Skill {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};


// --- MAIN COMPONENT ---
const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      id="about"
      className={`py-16 sm:py-24 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <SectionHeader title="About Me" className={darkMode ? 'text-white' : 'text-gray-900'} />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <ProfileImage darkMode={darkMode} />
          </motion.div>
          <motion.div className="md:col-span-3 flex flex-col space-y-12" variants={itemVariants}>
            <ExperienceSection darkMode={darkMode} />
            <TechStackSection darkMode={darkMode} />
            <SocialIcons darkMode={darkMode} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};


// --- SUB-COMPONENTS ---
const ProfileImage: React.FC<ProfileImageProps> = ({ darkMode }) => (
  <div className="relative w-full max-w-sm mx-auto">
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`relative rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'shadow-blue-500/10' : 'shadow-gray-400/30'}`}
    >
      <img src={img} alt="Manav Singh" className="w-full h-auto" />
      <div className={`absolute inset-0 border-4 rounded-3xl ${darkMode ? 'border-gray-700/50' : 'border-white/50'}`} />
    </motion.div>
  </div>
);

const ExperienceSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => (
  <motion.div variants={itemVariants} className="w-full">
    <h3 className="text-2xl font-bold mb-4">Experience</h3>
    <div className="space-y-4">
      <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${darkMode ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60' : 'bg-white/60 border-gray-200/80 hover:bg-white/80'}`}>
        <div className="flex justify-between items-start">
          <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>SDE Intern at DisruptiveNext</h4>
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>June 2024 - December 2024</span>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pune, India</p>
      </div>
      <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${darkMode ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60' : 'bg-white/60 border-gray-200/80 hover:bg-white/80'}`}>
        <div className="flex justify-between items-start">
          <h4 className={`font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Technical Lead</h4>
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sep 2023 - Jan 2025</span>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Microsoft Learn Student Club</p>
      </div>
       <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${darkMode ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60' : 'bg-white/60 border-gray-200/80 hover:bg-white/80'}`}>
        <div className="flex justify-between items-start">
          <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-600'}`}>Student Coordinator</h4>
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>March 2024 - Dec 2024</span>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Training and placement Cell, GHRCEM Pune</p>
      </div>
    </div>
  </motion.div>
);

const TechStackSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const skills: Skill[] = [
    { id: 'js', name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
    { id: 'react', name: 'React.js', icon: SiReact, color: 'text-sky-400' },
    { id: 'node', name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
    { id: 'java', name: 'Java', icon: FaJava, color: 'text-orange-500' },
    { id: 'python', name: 'Python', icon: SiPython, color: 'text-blue-500' },
    { id: 'mysql', name: 'MySQL', icon: SiMysql, color: 'text-blue-600' },
    { id: 'firebase', name: 'Firebase', icon: IoLogoFirebase, color: 'text-yellow-500' },
    { id: 'flutterflow', name: 'FlutterFlow', icon: SiFlutter, color: 'text-blue-500' },
    { id: 'github', name: 'GitHub', icon: SiGithub, color: 'text-gray-800' },
  ];

  return (
    <motion.div variants={itemVariants} className="w-full">
      <h3 className="text-2xl font-bold mb-4">Technical Arsenal</h3>
        <p className={`mt-2 mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            My go-to technologies for building robust and innovative solutions.
        </p>
      <SkillOrbit skills={skills} darkMode={darkMode} />
    </motion.div>
  );
};

const SkillOrbit: React.FC<{ skills: Skill[]; darkMode: boolean }> = ({ skills, darkMode }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [radius, setRadius] = useState(140);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setRadius(80);
            else if (width < 768) setRadius(100);
            else if (width < 1024) setRadius(120);
            else setRadius(140);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isHovered) {
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % skills.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isHovered, skills.length]);

    const handleIconClick = (index: number) => {
        setActiveIndex(index);
    };

    const ActiveIcon = skills[activeIndex]?.icon;
    const orbitRotation = -activeIndex * (360 / skills.length);

    return (
        <div
            className="relative h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-96 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                {ActiveIcon && (
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="text-center z-10 p-2 sm:p-4"
                    >
                        <ActiveIcon
                            className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-4 ${skills[activeIndex].id === 'github' && !darkMode ? 'text-gray-800' : skills[activeIndex].id === 'github' && darkMode ? 'text-white' : skills[activeIndex].color}`}
                        />
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                            {skills[activeIndex].name}
                        </h3>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="absolute w-full h-full"
                animate={{ rotate: orbitRotation }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                {skills.map((skill, index) => {
                    const angle = (index / skills.length) * 2 * Math.PI;
                    const x = radius * Math.sin(angle);
                    const y = radius * -Math.cos(angle);
                    const SkillIcon = skill.icon;
                    return (
                        <motion.div
                            key={skill.id}
                            className={`absolute top-1/2 left-1/2 p-2 sm:p-3 md:p-4 rounded-full border cursor-pointer ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}
                            style={{ x: `calc(-50% + ${x}px)`, y: `calc(-50% + ${y}px)` }}
                            onClick={() => handleIconClick(index)}
                            whileHover={{ scale: 1.15, boxShadow: `0 0 20px rgba(52, 211, 153, 0.5)` }}
                            animate={{ rotate: -orbitRotation }} // Counter-rotation
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <SkillIcon
                                className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 ${skill.id === 'github' && !darkMode ? 'text-gray-800' : skill.id === 'github' && darkMode ? 'text-white' : skill.color}`}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};


const SocialIcons: React.FC<SocialIconsProps> = ({ darkMode }) => {
    const socialIcons: SocialIcon[] = [
        { Icon: RiTwitterXFill, href: 'https://x.com/OgHybrid', label: 'Twitter', color: 'text-sky-500 hover:text-sky-400' },
        { Icon: RiLinkedinBoxFill, href: 'https://www.linkedin.com/in/iammanavsingh', label: 'LinkedIn', color: 'text-blue-600 hover:text-blue-500' },
        { Icon: FaGithub, href: 'https://github.com/Manavvv07', label: 'GitHub', color: 'text-gray-900 dark:text-gray-300 hover:text-black dark:hover:text-white' },
        { Icon: MdOutlineMailOutline, href: 'mailto:manavsingh29sk@gmail.com', label: 'Email', color: 'text-red-500 hover:text-red-400' },
        { Icon: FaInstagram, href: 'https://www.instagram.com/maaaanavvv', label: 'Instagram', color: 'text-pink-500 hover:text-pink-400' }
    ];

  return (
    <motion.div className="flex items-center space-x-6" variants={containerVariants}>
      <span className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Connect:</span>
      {socialIcons.map(({ Icon, href, label, color }, index) => (
        <motion.a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          variants={itemVariants}
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="block"
        >
          <Icon className={`w-7 h-7 transition-colors duration-300 ${color}`} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default AboutSection;