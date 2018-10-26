import React from 'react';

const Button = ({
    username,
    password,
    checkUserName,
    checkPassword,
  }) => (
    <button
    className="btn"
    type="submit" 
        onClick={() => {
          if (username===''||password===''||username==='Username is required'||password==='Password is required') {
           (username===''||username==='Username is required')&&checkUserName();
           (password===''||password==='Password is required')&&checkPassword();
           return;
          }
          alert('Log in ...');
        }}
    >Log in</button>
  )

export default Button;