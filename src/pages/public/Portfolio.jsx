import { usePortfolio } from '../../context/PortfolioContext';
import {
  ArrowDown,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Twitter,
  FolderOpen,
} from 'lucide-react';

export default function Portfolio() {
  const { data } = usePortfolio();
  const { hero, about, projects, skills, contact } = data;

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <p className="hero-greeting">// hello world</p>
          <h1 className="hero-name">{hero.name}</h1>
          <p className="hero-title">{hero.tagline}</p>
          <a href="#projects" className="hero-cta">
            View My Work <ArrowDown size={18} />
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <h2 className="section-title">
          About <span className="accent">Me</span>
        </h2>
        <p className="section-subtitle">{hero.title}</p>
        <div className="about-content">
          <p className="about-bio">{about.bio}</p>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <h2 className="section-title">
          My <span className="accent">Projects</span>
        </h2>
        <p className="section-subtitle">Things I've built and worked on</p>
        {projects.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>
            No projects yet. Add some from the admin panel!
          </p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-card-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <FolderOpen size={48} />
                  )}
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech?.map((t, i) => (
                      <span className="tech-tag" key={i}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.link && project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={14} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <h2 className="section-title">
          My <span className="accent">Skills</span>
        </h2>
        <p className="section-subtitle">Technologies and tools I work with</p>
        {skills.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>
            No skills added yet. Add them from the admin panel!
          </p>
        ) : (
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-item" key={skill.id}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <h2 className="section-title">
          Get In <span className="accent">Touch</span>
        </h2>
        <p className="section-subtitle">Feel free to reach out</p>
        <div className="contact-links">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="contact-link">
              <Mail size={18} /> {contact.email}
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} /> GitHub
            </a>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          )}
          {contact.twitter && (
            <a
              href={contact.twitter}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={18} /> Twitter
            </a>
          )}
        </div>
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} {hero.name}. Built with React.
      </footer>
    </div>
  );
}
