import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  const educationItems = [
    {
      degree: "Bachelor's Degree in Computer Science",
      institution: "Holy Mary Institute of Technology and Science",
      year: "2026",
      grade: "CGPA: 7.9/10"
    },
    {
      degree: "Intermediate Education (11th & 12th)",
      institution: "Sri Chaitanya Junior College",
      year: "2022",
      grade: "Percentage: 83%"
    },
    {
      degree: "Secondary School Education (10th)",
      institution: "Bharathi Vidya Bhavans",
      year: "2020",
      grade: "CGPA: 9.4/10"
    }
  ];

  return (
    <motion.section className="section">
      <h2>Education</h2>
      {educationItems.map((item, index) => (
        <motion.div
          key={index}
          className="education-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          whileHover={{ x: 10 }}
        >
          <h3>{item.degree}</h3>
          <p>{item.institution}</p>
          <p>Graduation Year: {item.year}</p>
          <p>{item.grade}</p>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Education; 