// src/components/Header.tsx
import React from 'react';
import { View } from '@aws-amplify/ui-react';

interface HeaderProps {
  content: string;
  url: string;
  bgColor: string;
  location: 'left' | 'center' | 'right';
}

const justifyContentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const Header: React.FC<HeaderProps> = ({ content, url, bgColor, location }) => {
  return (
    <View
      as="header"
      className="header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: justifyContentMap[location],
        backgroundColor: bgColor,
        width: '100%',
        padding: '1rem',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
      }}
    >
      <img src={url} alt="Logo" style={{ height: '40px', marginRight: '1rem' }} />
      <h1 style={{ margin: 0 }}>{content}</h1>
    </View>
  );
};

export default Header;
