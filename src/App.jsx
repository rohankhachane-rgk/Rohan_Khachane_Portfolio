import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  profile,
  stats,
  skillGroups,
  education,
  trainings,
  internships,
  projects,
  certifications
} from "./data/portfolioData";

function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const links = ["home", "about", "skills", "projects", "certifications", "experience", "contact"];

  return (
    <nav className="navbar glass">
      <a href="#home" className="logo">RK<span>.</span></a>

      <div className={open ? "navLinks open" : "navLinks"}>
        {links.map((link) => (
          <a key={link} href={`#${link}`} onClick={() => setOpen(false)}>
            {link}
          </a>
        ))}
      </div>

      <div className="navActions">
        <button className="themeBtn" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
        <button className="themeBtn menuBtn" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="section hero">
      <div className="heroGrid">
        <div className="heroContent">
          <p className="eyebrow">✨ Available for Fresher Roles</p>

          <h1>
            Hi, I'm <span>{profile.name}</span>
          </h1>

          <h2>{profile.title}</h2>

          <div className="roleList">
            {profile.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>

          <p className="heroText">{profile.summary}</p>

          <div className="heroActions">
            <a className="btn primary" href="#projects">View Projects</a>
            <a className="btn secondary" href="#contact">Contact Me</a>
          </div>

          <div className="socials">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>
              <FaEnvelope /> Email
            </a>
          </div>
        </div>

        <div className="profileCard glass">
          <div className="avatarRing">
            <div className="avatar">RK</div>
          </div>
          <h3>{profile.name}</h3>
          <p>📍 {profile.location}</p>
          <div className="miniTags">
           <span>Java</span>
           <span>Python</span>
           <span>React</span>
           <span>SQL</span>
           <span>Machine Learning</span>
           <span>Power BI</span>
           <span>Microsoft Azure</span>
           <span>Data Analytics</span>
          </div>
        </div>
      </div>

      <div className="statsGrid">
        {stats.map((item) => (
          <div className="stat glass" key={item.label}>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section compactSection">
      <div className="sectionHead">
        <p>About</p>
        <h2>Engineering mind with data-driven thinking</h2>
      </div>

      <div className="twoGrid">
        <div className="glass card">
          <h3>Career Objective</h3>
         <p>
  Computer Engineering graduate with a strong foundation in software development,
  data analytics, machine learning, and web technologies. Experienced in building
  software applications, interactive dashboards, data-driven solutions, and
  scalable web platforms through academic projects and internships. Proficient in
  Python, Java, SQL, Power BI, and web development technologies, with a keen
  interest in solving real-world business problems using technology and data.
  Seeking entry-level opportunities in Software Development, Data Analytics,
  Machine Learning, Business Analytics, or Technology Associate roles to
  contribute technical expertise, analytical thinking, and continuous learning
  to organizational success.
</p>
        </div>

        <div className="timeline">
          {education.map((item) => (
            <div className="timelineItem glass" key={item.degree}>
              <span>{item.duration}</span>
              <h3>🎓 {item.degree}</h3>
              <p>{item.institute}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section compactSection">
      <div className="sectionHead">
        <p>Skills</p>
        <h2>My technical toolkit</h2>
      </div>

      <div className="skillCategoryGrid">
        {skillGroups.map((group) => (
          <div className="skillCategoryCard glass" key={group.category}>
            <h3>{group.category}</h3>
            <div className="skillsInline">
              {group.items.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  const filteredProjects = projects.filter((project) => {
    const matchCategory = category === "All" || project.category === category;
    const searchText = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
    return matchCategory && searchText.includes(query.toLowerCase());
  });

  return (
    <section id="projects" className="section compactSection">
      <div className="sectionHead">
        <p>Projects</p>
        <h2>Selected work</h2>
      </div>

      <div className="projectControls glass">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search projects: Python, Java, ML, Power BI..."
        />

        <div className="categoryRow">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="projectGrid">
        {filteredProjects.map((project) => (
          <article className="projectCard glass" key={project.title} onClick={() => setSelected(project)}>
            <small>{project.category}</small>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="techList">
              {project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <button className="textBtn">View Details →</button>
          </article>
        ))}
      </div>

      {selected && (
        <div className="modalBg" onClick={() => setSelected(null)}>
          <div className="modal glass" onClick={(event) => event.stopPropagation()}>
            <button className="closeBtn" onClick={() => setSelected(null)}>✕</button>
            <p className="eyebrow">{selected.category}</p>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <h4>Impact</h4>
            <p>{selected.impact}</p>
            <h4>Technology Stack</h4>
            <div className="techList">
              {selected.tech.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


function Certifications() {
  return (
    <section id="certifications" className="section compactSection">
      <div className="sectionHead">
        <p>Certifications</p>
        <h2>Professional Certifications</h2>
      </div>

      <div className="cardGrid">
        {certifications.map((cert) => (
          <article className="infoCard glass" key={cert}>
            <small>Certification</small>
            <h3>{cert}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}


function Experience() {
  return (
    <section id="experience" className="section compactSection">

      <div className="sectionHead">
        <p>Training</p>
        <h2>Training Programs</h2>
      </div>

      <div className="cardGrid">
        {trainings.map((item) => (
          <article className="infoCard glass" key={`${item.role}-${item.company}`}>
            <small>Training</small>
            <h3>{item.role}</h3>
            <p>{item.company}</p>
            <div className="techList">
              <span>{item.duration}</span>
              {item.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="sectionHead experienceHead">
        <p>Internships</p>
        <h2>Professional Internship Experience</h2>
      </div>

      <div className="cardGrid">
        {internships.map((item) => (
          <article className="infoCard glass" key={`${item.role}-${item.company}`}>
            <small>Internship</small>
            <h3>{item.role}</h3>
            <p>{item.company}</p>
            <div className="techList">
              <span>{item.duration}</span>
              {item.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}


function Contact() {
  const [sent, setSent] = useState(false);

function handleSubmit(event) {
  event.preventDefault();

  emailjs
    .sendForm(
      "service_m6182zm",
      "template_rzgfx8o",
      event.currentTarget,
      "eHc63Etxv5gLPwvzp"
    )
    .then(() => {
      setSent(true);
      event.target.reset();
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to send message.");
    });
}

  return (
    <section id="contact" className="section compactSection">
      <div className="sectionHead">
        <p>Contact Me</p>
        <h2>Let's build something useful</h2>
      </div>

      <div className="twoGrid">
        <div className="glass card contactLinks">
          <a href={`mailto:${profile.email}`}>📧 {profile.email}</a>
          <a href={`tel:${profile.phone}`}>📱 {profile.phone}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
            </a>
        </div>

       <form className="glass contactForm" onSubmit={handleSubmit}>
  <input
    name="name"
    required
    placeholder="Your Name"
  />

  <input
    name="email"
    type="email"
    required
    placeholder="Your Email"
  />

  <textarea
    name="message"
    rows="5"
    required
    placeholder="Your Message"
  ></textarea>

  <button className="btn primary" type="submit">
    Send Message
  </button>

  {sent && (
    <p className="success">
      ✅ Thank you for reaching out! I will get back to you soon.
    </p>
  )}
</form>
      </div>
    </section>
  );
}

function App() {
  const [dark, setDark] = useState(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
});

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <p>Designed & Developed by Rohan Khachane</p>
        <small>Building Smart Solutions with Code, Data, and Innovation</small>
      </footer>
    </>
  );
}

export default App;
