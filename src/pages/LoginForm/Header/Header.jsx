import React from 'react';
import LogoImage from '../../../assets/logo.png';

const Header = () => (
  <div className='header layout'>
    <div className='logo'>
      <img src={LogoImage} alt='LMS' />
      LMS
    </div>
  </div>
);

export default Header;
