import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    'Python', 'OpenCV', 'Image Processing', 
    'Facial Recognition', 'Computer Vision', 'Machine Learning',
    'Speech Recognition', 'Web Development','JavaScript', 'HTML', 
    'CSS'
  ];

  return (
    <motion.section className="section">
      <h2>Technical Skills</h2>
      <div className="skill-list">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            className="skill-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills; 