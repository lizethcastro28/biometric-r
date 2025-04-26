// src/components/Footer.tsx
import React from 'react';
import { View } from '@aws-amplify/ui-react';

interface FooterProps {
    content: string;
    bgColor: string;
    location: 'left' | 'center' | 'right';
}

const justifyContentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
};

const Footer: React.FC<FooterProps> = ({ content, bgColor, location }) => {
    return (
        <View
            as="footer"
            style={{
                backgroundColor: bgColor,
                padding: '1rem',
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                justifyContent: justifyContentMap[location],
                boxSizing: 'border-box',
            }}
        >
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </View>
    );
};

export default Footer;