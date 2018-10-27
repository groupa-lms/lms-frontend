import React from 'react';
import LogoImage from '../../assets/logo.png';
import Menu from './Menu.jsx';


const Header = () => (
    <div className="header layout">
      <div className="logo">
      <img src={ LogoImage } alt="LMS" />
        LMS
      </div>
      <Menu active link="/">Home</Menu>
      <Menu link="/course">Course</Menu>
      <Menu link="/student">Student</Menu>
      <Menu link="/Lecturer">Lecturer</Menu>
    </div>
  )

  export default Header;