import React from 'react';
import { motion } from 'framer-motion';

// Define the props interface
interface SectionHeaderProps {
  title: string;
  className?: string; // Optional prop
}

// Use the interface in the functional component
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className }) => (
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`mb-12 text-3xl font-bold text-center md:text-4xl lg:text-5xl ${className}`}
  >
    {title}
  </motion.h2>
);

export default SectionHeader;
