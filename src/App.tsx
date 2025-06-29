import { ThemeProvider, View } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import './index.css';
import { Messages } from './config/Messages';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Theme from './config/CustomTheme';

const headerData = Messages.header;
const footerData = Messages.footer;

function changeTitle() {
  document.title = Messages.title;
}

function changeIcon() {
  const linkIcon = document.querySelector('link[rel="icon"]');
  if (linkIcon) {
    (linkIcon as HTMLLinkElement).href = Messages.icon;
  }
}

const safeLocation = (value: string): 'left' | 'center' | 'right' => {
  if (value === 'left' || value === 'center' || value === 'right') {
    return value;
  }
  return 'left';
}



function App() {

  useEffect(() => {
    changeTitle();
    changeIcon();

    const params = new URLSearchParams(window.location.search);
    const circuit = params.get('circuit');
    console.log('Circuit:', circuit);


  }, []);

  return (
    <ThemeProvider theme={Theme}>
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
        <Header headerData={{ ...headerData, location: safeLocation(headerData.location) }} />
        <main style={{ flex: 1, width: '100%' }}>
          <Body Messages={Messages} />
        </main>
        <Footer footerData={{ ...footerData, location: safeLocation(footerData.location) }} />
      </View>
    </ThemeProvider>
  );
}

export default App;
