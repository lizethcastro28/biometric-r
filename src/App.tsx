// src/App.tsx
import React, { useEffect } from 'react';
import './index.css';
import { ThemeProvider, View } from '@aws-amplify/ui-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

const logoUrl = '/logo.svg';
const footerContent = "<p>Derechos de autor © 2025 <b>Mi Aplicación</b></p>";
const footerBgColor = 'lightgray';

function changeTitle() {
  document.title = 'Biometric App';
}

function changeIcon() {
  const linkIcon = document.querySelector('link[rel="icon"]');
  if (linkIcon) {
    (linkIcon as HTMLLinkElement).href = logoUrl;
  }
}

function changeButtonColor(newColor: string) {
  document.documentElement.style.setProperty('--button-background-color', newColor);
  document.documentElement.style.setProperty('--button-border-color', newColor);
}

function App() {
  useEffect(() => {
    changeTitle();
    changeIcon();
    changeButtonColor('green');
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
      }}
    >
      <Header
        content="Mi Aplicación Biometric"
        url="/logo.svg"
        bgColor="lightblue"
        location="left"
      />
      <main style={{ flex: 1, width: '100%' }}>
        <Body />
      </main>
      <Footer content={footerContent} bgColor={footerBgColor} />
    </View>
  );
}

export default App;