import React from 'react';
import ColorfulContent from './ColorfulContent.jsx';
import Section from './Section.jsx';
import AboutUs from './AboutUs.jsx';


const Footer = () => (
    <div className="footer layout">
      <Section title="HELP AND SUPPORT">
        <div className="help-and-support">
          <p>For users experiencing difficulties using LMS, please contact technical support.</p>
          <AboutUs />
        </div>
      </Section>
      <Section title="QUICK LINKS">
        <ColorfulContent><a href="https://jiangren.com.au/service">JR Academy</a></ColorfulContent>
      </Section>
    </div>
  );

  export default Footer;