// src/App.tsx
import { useEffect } from 'react';
import './index.css';
import { View } from '@aws-amplify/ui-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

const logoUrl = '/logo.svg';
const headerData = {
  url: '/logo.svg',
  location: 'left',
  bgColor: '#0C6069',
  content: 'Mi Aplicación Biometric'
};
const footerData = {
  "content": "<table style=\"margin: 10px auto; background-color: #0C6069;\"><tbody><tr><td style=\"text-align: center;\"><div style=\"font-weight: 300; font-size: 10px; color: #585858; font-family: Helvetica, serif;\"><div><a href=\"https://examplecompany.com\" target=\"_blank\" style=\"font-size: 17px; font-weight: 300; color: #fff; text-decoration: none; font-family: Helvetica, serif;\">www.examplecompany.com</a></div><div style=\"font-size: 11px; color: #fff;\"><p style=\"font-size: 12px; color: #fff;\"><a href=\"https://examplecompany.com/\" style=\"color: #fff; text-decoration: none; font-family: Helvetica, serif;\">Políticas de privacidad</a></p></div></div></td></tr></tbody></table>",
  "location": "center",
  "bgColor": "#0C6069"
};


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
const safeLocation = (value: string): 'left' | 'center' | 'right' => {
  if (value === 'left' || value === 'center' || value === 'right') {
    return value;
  }
  return 'left';
};

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
      <Header {...{ ...headerData, location: safeLocation(headerData.location) }} />

      <main style={{ flex: 1, width: '100%' }}>
        <Body />
      </main>
      <Footer {...{ ...footerData, location: safeLocation(footerData.location) }} />
    </View>
  );
}

export default App;