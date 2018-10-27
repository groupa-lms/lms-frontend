import React from 'react';
import ColorfulContent from './ColorfulContent.jsx';
import Section from './Section.jsx';



const Footer = () => (
    <div className="footer layout">
      <Section title="HELP AND SUPPORT">
        <div className="help-and-support">
          <p>For users experiencing difficulties using LMS, please contact technical support.</p>
          <ul className="about-us">
            <li><ColorfulContent title="Administrator">Dawson Sun</ColorfulContent></li>
            <li><ColorfulContent title="Email"><a href="mailto:dc880123@gmail.com">dc880123@gmail.com</a></ColorfulContent></li>
            <li><ColorfulContent title="Phone">0451193278</ColorfulContent></li>
          </ul>
        </div>
      </Section>
      <Section title="QUICK LINKS">
        <ColorfulContent><a href="https://jiangren.com.au/service">JR Academy</a></ColorfulContent>
      </Section>
    </div>
  );

  export default Footer;