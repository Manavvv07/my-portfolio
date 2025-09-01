import React from 'react';
import { motion } from 'framer-motion';
import { RiCodeSSlashFill, RiCopyrightLine } from 'react-icons/ri';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`px-3 py-4 ${darkMode
        ? 'text-gray-300 bg-gradient-to-t from-gray-900 to-gray-800'
        : 'text-gray-600 bg-gradient-to-t from-sky-100 to-white'
        }`}
    >
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col justify-center items-center space-y-2">
          <motion.div
            className="flex items-center text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <RiCopyrightLine className="mr-1" />
            <span>{currentYear} Manav Singh</span>
          </motion.div>

          <motion.div
            className="flex items-center text-xs"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span>Made with</span>
            <RiCodeSSlashFill className="mx-1 text-blue-500" />
            <span>React and ChatGPT (SHHHH...)</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;