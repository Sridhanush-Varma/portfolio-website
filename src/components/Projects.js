import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Image Processing Suite",
      details: [
        "Developed algorithms for image dilation and erosion",
        "Implemented morphological gradient detection",
        "Created facial recognition system with live camera integration"
      ],
      technologies: ["Python", "OpenCV", "NumPy"],
      github: "https://github.com/Sridhanush-Varma/Image-Processing-Suite.git"
    },
    {
      title: "ChatBot using Python",
      details: [
        "Developed a basic chatbot using Python",
        "Implemented a chatbot using NLTK library",
        "Created a chatbot that can answer questions and help with tasks",
        "Created the chatbot using speech technology"
      ],
      technologies: ["Python", "NLTK", "Speech Recognition"],
      github: "https://github.com/Sridhanush-Varma/Chatbot.git"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <motion.section 
      className="section projects-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2>Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            variants={projectVariants}
            whileHover={{ y: -5 }}
          >
            <h3>{project.title}</h3>
            <ul className="project-details">
              {project.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
            <motion.div 
              className="project-technologies"
              variants={containerVariants}
            >
              {project.technologies.map((tech, idx) => (
                <motion.span
                  key={idx}
                  className="technology-tag"
                  variants={tagVariants}
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
            <motion.a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View on GitHub
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects; 