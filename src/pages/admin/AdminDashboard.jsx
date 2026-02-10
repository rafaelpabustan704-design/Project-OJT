import { useState } from 'react';
import {
  User,
  FileText,
  FolderOpen,
  Wrench,
  Mail,
  RotateCcw,
  Plus,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useToast } from '../../components/Toast';

const tabs = [
  { id: 'hero', label: 'Hero', icon: User },
  { id: 'about', label: 'About', icon: FileText },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('hero');
  const {
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
  } = usePortfolio();
  const { showToast } = useToast();

  return (
    <div className="page-wrapper">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <p className="admin-sidebar-title">Manage</p>
          <nav className="admin-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />
            <button
              onClick={() => {
                if (window.confirm('Reset all data to defaults?')) {
                  resetData();
                  showToast('Data reset to defaults');
                }
              }}
              style={{ color: 'var(--danger)' }}
            >
              <RotateCcw size={18} />
              Reset All
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="admin-content">
          {activeTab === 'hero' && <HeroEditor data={data.hero} onSave={updateHero} showToast={showToast} />}
          {activeTab === 'about' && <AboutEditor data={data.about} onSave={updateAbout} showToast={showToast} />}
          {activeTab === 'projects' && (
            <ProjectsEditor
              projects={data.projects}
              onAdd={addProject}
              onUpdate={updateProject}
              onDelete={deleteProject}
              showToast={showToast}
            />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor
              skills={data.skills}
              onAdd={addSkill}
              onUpdate={updateSkill}
              onDelete={deleteSkill}
              showToast={showToast}
            />
          )}
          {activeTab === 'contact' && <ContactEditor data={data.contact} onSave={updateContact} showToast={showToast} />}
        </main>
      </div>
    </div>
  );
}

/* ===== HERO EDITOR ===== */
function HeroEditor({ data, onSave, showToast }) {
  const [form, setForm] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    showToast('Hero section updated!');
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Hero Section</h2>
        <p>Edit your hero banner content</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Your Name</label>
          <input
            className="form-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Title / Role</label>
          <input
            className="form-input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Full Stack Developer"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Tagline</label>
          <textarea
            className="form-textarea"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            placeholder="A short catchy sentence about you"
            rows={3}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

/* ===== ABOUT EDITOR ===== */
function AboutEditor({ data, onSave, showToast }) {
  const [form, setForm] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    showToast('About section updated!');
  };

  return (
    <div>
      <div className="admin-header">
        <h2>About Section</h2>
        <p>Tell visitors about yourself</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea
            className="form-textarea"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Write about yourself..."
            rows={6}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Profile Image URL (optional)</label>
          <input
            className="form-input"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="https://example.com/photo.jpg"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

/* ===== PROJECTS EDITOR ===== */
function ProjectsEditor({ projects, onAdd, onUpdate, onDelete, showToast }) {
  const [modal, setModal] = useState(null); // null | 'add' | project object

  const handleSave = (project) => {
    if (modal === 'add') {
      onAdd(project);
      showToast('Project added!');
    } else {
      onUpdate(modal.id, project);
      showToast('Project updated!');
    }
    setModal(null);
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Projects</h2>
        <p>Manage your portfolio projects</p>
      </div>

      <div className="item-list">
        {projects.map((p) => (
          <div className="item-row" key={p.id}>
            <div className="item-row-info">
              <div className="item-row-title">{p.title}</div>
              <div className="item-row-subtitle">{p.tech?.join(', ')}</div>
            </div>
            <div className="item-row-actions">
              <button className="btn btn-outline btn-sm" onClick={() => setModal(p)}>
                <Pencil size={14} />
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  if (window.confirm(`Delete "${p.title}"?`)) {
                    onDelete(p.id);
                    showToast('Project deleted');
                  }
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={() => setModal('add')}>
        <Plus size={16} /> Add Project
      </button>

      {modal && (
        <ProjectModal
          project={modal === 'add' ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

function ProjectModal({ project, onSave, onClose }) {
  const [form, setForm] = useState(
    project || {
      title: '',
      description: '',
      tech: [],
      link: '',
      github: '',
      image: '',
    }
  );
  const [techInput, setTechInput] = useState(project?.tech?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      tech: techInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="modal-title">{project ? 'Edit Project' : 'Add Project'}</h3>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="My Awesome Project"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What does this project do?"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Technologies (comma-separated)</label>
            <input
              className="form-input"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Live URL</label>
            <input
              className="form-input"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://myproject.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input
              className="form-input"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="https://github.com/user/repo"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Image URL (optional)</label>
            <input
              className="form-input"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://example.com/screenshot.png"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {project ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===== SKILLS EDITOR ===== */
function SkillsEditor({ skills, onAdd, onUpdate, onDelete, showToast }) {
  const [modal, setModal] = useState(null);

  const handleSave = (skill) => {
    if (modal === 'add') {
      onAdd(skill);
      showToast('Skill added!');
    } else {
      onUpdate(modal.id, skill);
      showToast('Skill updated!');
    }
    setModal(null);
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Skills</h2>
        <p>Manage your skills and proficiency levels</p>
      </div>

      <div className="item-list">
        {skills.map((s) => (
          <div className="item-row" key={s.id}>
            <div className="item-row-info">
              <div className="item-row-title">{s.name}</div>
              <div className="item-row-subtitle">{s.level}% proficiency</div>
            </div>
            <div className="item-row-actions">
              <button className="btn btn-outline btn-sm" onClick={() => setModal(s)}>
                <Pencil size={14} />
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  if (window.confirm(`Delete "${s.name}"?`)) {
                    onDelete(s.id);
                    showToast('Skill deleted');
                  }
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={() => setModal('add')}>
        <Plus size={16} /> Add Skill
      </button>

      {modal && (
        <SkillModal
          skill={modal === 'add' ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

function SkillModal({ skill, onSave, onClose }) {
  const [form, setForm] = useState(skill || { name: '', level: 50 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, level: Number(form.level) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="modal-title">{skill ? 'Edit Skill' : 'Add Skill'}</h3>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Skill Name</label>
            <input
              className="form-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="React"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Proficiency Level: {form.level}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              style={{ width: '100%', accentColor: 'var(--accent)' }}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {skill ? 'Save Changes' : 'Add Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===== CONTACT EDITOR ===== */
function ContactEditor({ data, onSave, showToast }) {
  const [form, setForm] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    showToast('Contact info updated!');
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Contact Info</h2>
        <p>Update your contact details and social links</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="hello@example.com"
          />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub URL</label>
          <input
            className="form-input"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            placeholder="https://github.com/username"
          />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn URL</label>
          <input
            className="form-input"
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Twitter URL</label>
          <input
            className="form-input"
            value={form.twitter}
            onChange={(e) => setForm({ ...form, twitter: e.target.value })}
            placeholder="https://twitter.com/username"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}
