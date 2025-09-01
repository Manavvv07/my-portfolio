import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/Hero';
import AboutSection from '../components/About';
import WorkSection from '../components/Work';
import ProjectsSection from '../components/Projects';
import ContactSection from '../components/Contact';
import { COLORS } from '../utils/constants';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    document.body.className = darkMode ? COLORS.dark.bg : COLORS.light.bg;
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main>
        <HeroSection darkMode={darkMode} />
        <AboutSection darkMode={darkMode} />
        <WorkSection darkMode={darkMode} />
        <ProjectsSection darkMode={darkMode} />
      </main>
      <ContactSection darkMode={darkMode} />
    </div>
  );
};

export default HomePage;