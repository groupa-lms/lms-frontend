import React from 'react';
import Logo from './Logo.jsx';
import Menu from './Menu.jsx';


const Header = () => (
    <div className="header layout">
      <Logo />
      <Menu active link="/">Home</Menu>
      <Menu link="/course">Course</Menu>
      <Menu link="/student">Student</Menu>
      <Menu link="/Lecturer">Lecturer</Menu>
    </div>
  )

  export default Header;