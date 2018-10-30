import React from 'react';

const ColorfulContent = ({
    title,
    children,
  }) => (
    <div className="colorful-content">
      {title && (<span className="title">{title}:</span>)}
      <span className="content">{children}</span>
    </div>
  )

export default ColorfulContent;