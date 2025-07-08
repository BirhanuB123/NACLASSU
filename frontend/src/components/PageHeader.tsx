
import React from 'react';

interface PageHeaderProps {
  title: string;
  background?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, background, children }) => {
  const bgStyle = background 
    ? { backgroundImage: `url(${background})` } 
    : { background: 'linear-gradient(135deg, #454c76 0%, #2f3450 100%)' };

  return (
    <div className="page-header" style={bgStyle}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{title}</h1>
        {children && <div className="text-white">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
