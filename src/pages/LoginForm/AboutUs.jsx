import React from 'react';
import ColorfulContent from './ColorfulContent.jsx';

const AboutUs = ({
    items,
  }) => (
    <ul className="about-us">
      <li><ColorfulContent title="Administrator">Dawson Sun</ColorfulContent></li>
      <li><ColorfulContent title="Email"><a href="mailto:dc880123@gmail.com">dc880123@gmail.com</a></ColorfulContent></li>
      <li><ColorfulContent title="Phone">0451193278</ColorfulContent></li>
    </ul>
  );

  export default AboutUs;