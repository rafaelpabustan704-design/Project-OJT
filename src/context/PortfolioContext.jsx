import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

const defaultData = {
  hero: {
    name: 'Your Name',
    title: 'Full Stack Developer',
    tagline: 'Building modern web experiences with clean code and creative design.',
  },
  about: {
    bio: 'I am a passionate developer with experience in building web applications. I love turning ideas into reality through code.',
    image: '',
  },
  projects: [
    {
      id: '1',
      title: 'Sample Project',
      description: 'A sample project to showcase your work. Edit this from the admin panel.',
      tech: ['React', 'Node.js', 'CSS'],
      link: '#',
      github: '#',
      image: '',
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 90 },
    { id: '2', name: 'JavaScript', level: 85 },
    { id: '3', name: 'CSS', level: 80 },
    { id: '4', name: 'Node.js', level: 75 },
  ],
  contact: {
    email: 'hello@example.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: '',
  },
};

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolio-data');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-data', JSON.stringify(data));
  }, [data]);

  const updateHero = (hero) => setData(prev => ({ ...prev, hero }));
  const updateAbout = (about) => setData(prev => ({ ...prev, about }));
  const updateContact = (contact) => setData(prev => ({ ...prev, contact }));

  const addProject = (project) => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: Date.now().toString() }],
    }));
  };

  const updateProject = (id, project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...project } : p)),
    }));
  };

  const deleteProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  const addSkill = (skill) => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: Date.now().toString() }],
    }));
  };

  const updateSkill = (id, skill) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, ...skill } : s)),
    }));
  };

  const deleteSkill = (id) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  };

  const resetData = () => {
    setData(defaultData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateHero,
        updateAbout,
        updateContact,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        resetData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
