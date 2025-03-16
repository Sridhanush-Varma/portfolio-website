import React from 'react';
import { Header, Skills, Education, Projects, Section } from './components';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename="/Portfolio-Website">
      <div className="App">
        <Header />
        <main>
          <Section id="summary">
            <h2>Professional Summary</h2>
            <p>A Computer Science Aspirant eager to explore the depths of Python Programming Language and dive deep into concepts like Computer Vision and Image Processing. Experienced in Python, OpenCV, NumPy, NTLK, Speech Recognition and Web Development.</p>
          </Section>
          <Skills />
          <Education />
          <Projects />
        </main>
      </div>
    </Router>
  );
}

export default App; 