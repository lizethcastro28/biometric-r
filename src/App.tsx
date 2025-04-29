import { ThemeProvider, View } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import './index.css';
import { Messages } from './config/Messages';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Theme from './config/CustomTheme';
import { get } from 'aws-amplify/api';


const headerData = Messages.header;
const footerData = Messages.footer;

function changeTitle() { document.title = Messages.title; }
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
};

// función para llamar a channelFunction

async function callChannelFunction(circuit: string) {
  try {
    const { body } = await get({
      apiName: 'channelFunction',
      path: '/',
      options: {
        queryParams: { circuit },
      },
    }).response;

    console.log('Respuesta de channelFunction:', body);
    return body;
  } catch (error) {
    console.error('Error llamando a channelFunction:', error);
    return null;
  }
}


function App() {
  const [channelData, setChannelData] = useState<any>(null); // Estado para guardar la respuesta

  useEffect(() => {
    changeTitle();
    changeIcon();

    const params = new URLSearchParams(window.location.search);
    const circuit = params.get('circuit');

    if (circuit) {
      callChannelFunction(circuit).then(data => {
        if (data) {
          setChannelData(data);
          console.log('Respuesta de channelFunction:', channelData);
        }
      });
    }
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
          {/* Puedes pasar la data al Body si quieres */}
          <Body Messages={Messages} />
        </main>

        <Footer footerData={{ ...footerData, location: safeLocation(footerData.location) }} />
      </View>
    </ThemeProvider>
  );
}

export default App;
