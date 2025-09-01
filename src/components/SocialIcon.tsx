import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

interface SocialIconProps {
  Icon: React.ElementType;
  href: string;
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = React.memo(({ Icon, href, className }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`p-3 text-2xl rounded-full transition-colors duration-300 ${className}`}
    aria-label={`Visit ${href}`}
  >
    <Icon />
  </motion.a>
));

SocialIcon.propTypes = {
  // @ts-ignore
  Icon: PropTypes.elementType.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SocialIcon;