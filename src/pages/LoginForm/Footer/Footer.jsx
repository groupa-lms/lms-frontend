import React from 'react';
import ColorfulContent from './ColorfulContent.jsx';
import Section from './Section.jsx';

const styles = theme => ({
  footerLayout:{
    position: absolute,
    bottom: 0
  }
});
const Footer = () => (
  <div className='footer layout'>
    <Section title='HELP AND SUPPORT'>
      <div className='help-and-support'>
        <p>
          For users experiencing difficulties using LMS, please contact
          technical support.
        </p>
        <ul className='about-us'>
          <li>
            <ColorfulContent title=''>Xin Chen</ColorfulContent>
            <ColorfulContent title='Email'>
              <a href='mailto:fqchenxin@gmail.com'>fqchenxin@gmail.com</a>
            </ColorfulContent>
          </li>
          <li>
            <ColorfulContent title=''>Yinfei Tang</ColorfulContent>
            <ColorfulContent title='Email'>
              <a href='mailto:fqchenxin@gmail.com'>istangyf@gmail.com</a>
            </ColorfulContent>
          </li>
        </ul>
      </div>
    </Section>
    <Section title='QUICK LINKS'>
      <ColorfulContent>
        <a href='https://jiangren.com.au/service'>JR Academy</a>
      </ColorfulContent>
    </Section>
  </div>
);

  export default Footer;