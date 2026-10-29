import About from './components/About.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Initiatives from './components/Initiatives.jsx';
import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Ticker from './components/Ticker.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <div className="section section-alt">
          <div className="container credentials-grid">
            <Education />
            <Certifications />
          </div>
        </div>
        <Initiatives />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
