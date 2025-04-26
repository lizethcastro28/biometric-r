// src/components/Footer.tsx
import React from 'react';
import { View } from '@aws-amplify/ui-react';

interface FooterProps {
  content: string;
  bgColor: string;
}

const Footer: React.FC<FooterProps> = ({ content, bgColor }) => {
  return (
    <View
      as="footer"
      style={{
        backgroundColor: bgColor,
        padding: '1rem',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Footer;