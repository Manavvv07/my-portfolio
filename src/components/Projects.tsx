import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from './SectionHeader';
import { LucideIcon, Users, Mail, Building } from 'lucide-react';

interface ProjectsSectionProps {
  darkMode: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  icon: LucideIcon;
  tags: string[];
  color: string;
}

// --- NEW PROJECTS DATA FROM YOUR RESUME ---
const projects: Project[] = [
  {
    id: 1,
    title: 'Alumni Association Platform',
    description:
      'A full-stack web platform designed to connect alumni with current students, enabling mentorship, networking, and job opportunities.',
    highlights: [
      'Role-based authentication for Alumni and Admins',
      'Alumni directory with advanced search & filters',
      'Job board, event management, and real-time messaging',
    ],
    icon: Users,
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    color: 'hsl(200, 70%, 60%)',
  },
  {
    id: 2,
    title: 'Cold E-Mail Generator',
    description:
      'A Generative AI tool leveraging open-source LLMs and vector databases to personalize and automate cold email outreach.',
    highlights: [
      'Built using LLaMA 3.1 with LangChain pipelines',
      'Integrated vector database for contextual memory',
      'Deployed with Streamlit for an interactive UI',
    ],
    icon: Mail,
    tags: ['Python', 'LLaMA 3.1', 'LangChain', 'Streamlit'],
    color: 'hsl(260, 70%, 65%)',
  },
  {
    id: 3,
    title: 'PG Life - Accommodation Finder',
    description:
      'A responsive website to help students discover PGs and hostels in unfamiliar cities with detailed listings and reviews.',
    highlights: [
      'Mobile-first responsive design with Bootstrap',
      'Dynamic search and filter for accommodations',
      'User authentication and review system',
    ],
    icon: Building,
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap'],
    color: 'hsl(340, 70%, 55%)',
  },
];

// --- MAIN COMPONENT ---
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      id="projects"
      className={`py-16 sm:py-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto px-4">
        <SectionHeader title="My Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} darkMode={darkMode} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// --- SUB-COMPONENTS ---
const ProjectCard: React.FC<{ project: Project; darkMode: boolean; index: number }> = ({
  project,
  darkMode,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`rounded-2xl p-6 relative overflow-hidden transition-all duration-300 h-full flex flex-col ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}
      style={{
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon and Title */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: `${project.color}20`, color: project.color }}>
          <project.icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold">{project.title}</h3>
      </div>

      {/* Description */}
      <p className={`mb-3 flex-grow ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>

      {/* Highlights */}
      <ul className={`list-disc pl-5 mb-4 space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
        {project.highlights.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200/50 text-gray-700'}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover Effects */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${project.color}05, transparent 40%)`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectsSection;
