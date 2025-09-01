import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { RiTwitterXFill, RiLinkedinBoxFill, RiCopyrightLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

interface ContactProps {
  darkMode: boolean;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SocialIconData {
  Icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
};

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formControls = useAnimation();
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const socialControls = useAnimation();
  const [socialRef, socialInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  useEffect(() => {
    if (formInView) formControls.start('visible');
  }, [formControls, formInView]);

  useEffect(() => {
    if (socialInView) socialControls.start('visible');
  }, [socialControls, socialInView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // This is where you would handle the form submission logic
    // For now, it's a mock delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFormData({ name: '', email: '', message: '' });
    setSubmitMessage('Message sent successfully!');
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        hidden: { opacity: 0, y: 50 }
      }}
      className={`relative min-h-screen flex items-center overflow-hidden py-16 sm:py-20
        ${darkMode
          ? 'bg-gradient-to-br via-gray-900 from-gray-950 to-gray-950'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}
    >
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

      <div className="container relative z-10 px-4 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <SectionHeader
            title="Get in Touch"
            className={`text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
          />
        </motion.div>

        <motion.div
          ref={formRef}
          initial="hidden"
          animate={formControls}
          variants={containerVariants}
          className="px-4 mx-auto max-w-2xl sm:px-6 lg:px-8"
        >
          {/* --- The placeholder has been added below --- */}
          <motion.form
            action="https://formspree.io/f/xnnbzgeg"
            method="POST"
            onSubmit={handleSubmit}
            className={`${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} 
              backdrop-blur-lg
              rounded-xl sm:rounded-2xl 
              shadow-lg
              p-5 sm:p-8 
              space-y-4 sm:space-y-6
              border border-gray-700/10`}
            variants={itemVariants}
          >
            {(['name', 'email', 'message'] as const).map((field, index) => (
              <motion.div
                key={field}
                variants={itemVariants}
                custom={index}
              >
                <label
                  htmlFor={field}
                  className={`block text-sm font-medium mb-2 
                    ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === 'message' ? (
                  <textarea
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border transition duration-300
                      ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-gray-400'
                      } 
                      focus:outline-none focus:ring-2`}
                  />
                ) : (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition duration-300
                      ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-gray-400'
                      } 
                      focus:outline-none focus:ring-2`}
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full py-3 overflow-hidden font-semibold text-white transition duration-300 rounded-lg 
                ${darkMode
                  ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400'
                }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>

          <AnimatePresence>
            {submitMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 font-medium text-center text-green-500"
              >
                {submitMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <SocialIcons darkMode={darkMode} socialRef={socialRef} socialControls={socialControls} />

        <motion.footer
          className="mt-8 sm:mt-12 text-center space-y-3 sm:space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className={`flex items-center justify-center text-sm 
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            whileHover={{ scale: 1.05 }}
          >
            <RiCopyrightLine className="mr-1" />
            <span>{currentYear} Manav Singh</span>
          </motion.div>

          <motion.div
            className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <p>All Rights Reserved</p>
            <p className="mt-1">Well I'm not a lawyer, but it sounds fancy </p>
          </motion.div>
        </motion.footer>
      </div>

      <div className="absolute -top-20 -right-10 sm:-top-40 sm:-right-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] sm:blur-[120px] bg-blue-500/10 animate-pulse-slow" />
      <div className="absolute -bottom-20 -left-10 sm:-bottom-40 sm:-left-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] sm:blur-[120px] bg-purple-500/10 animate-pulse-slow" />
    </motion.section>
  );
};

interface SocialIconsProps {
  darkMode: boolean;
  socialRef: React.RefObject<HTMLDivElement> | any;
  socialControls: ReturnType<typeof useAnimation>;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ darkMode, socialRef, socialControls }) => {
  const socialIcons: SocialIconData[] = [
    { Icon: RiTwitterXFill, href: "https://x.com/OgHybrid", label: "Twitter", color: "text-blue-400" },
    { Icon: RiLinkedinBoxFill, href: "https://www.linkedin.com/in/iammanavsingh", label: "LinkedIn", color: "text-blue-500" },
    { Icon: FaGithub, href: "https://github.com/Manavvv07", label: "GitHub", color: darkMode ? "text-white" : "text-gray-800" },
    { Icon: MdOutlineMailOutline, href: "mailto:manavsingh29sk@gmail.com", label: "Email", color: "text-red-500" },
    { Icon: FaInstagram, href: "https://www.instagram.com/maaaanavvv", label: "Instagram", color: "text-pink-500" }
  ];

  return (
    <motion.div
      ref={socialRef}
      initial="hidden"
      animate={socialControls}
      variants={containerVariants}
      className="flex justify-center items-center mt-8 space-x-6"
    >
      {socialIcons.map(({ Icon, href, label, color }, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          custom={index}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`inline-flex justify-center items-center transition-all duration-300 ${color} hover:opacity-80`}
          >
            <Icon className="text-xl sm:text-2xl" />
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Contact;