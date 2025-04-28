// src/components/Footer.tsx
import React from 'react';
import { View } from '@aws-amplify/ui-react';

interface FooterData {
  content: string;
  bgColor: string;
  location: 'left' | 'center' | 'right';
}

interface FooterProps {
  footerData: FooterData;
}

const justifyContentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const Footer: React.FC<FooterProps> = ({ footerData: { content, bgColor, location } }) => {
  return (
    <View
      as="footer"
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: justifyContentMap[location],
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </View>
  );
};

export default Footer;
