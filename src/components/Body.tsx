// src/components/Body.tsx
import React, { useState } from 'react';
import { Grid, View } from '@aws-amplify/ui-react';
import Instructions from '../components/Instructions';

interface BodyProps {
  Messages: any;
}

const Body: React.FC<BodyProps> = ({ Messages }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  const handleContinue = () => {
    setShowInstructions(false);
  };

  return (
    <Grid
      className="body-grid"
      gap="1rem"
      width="100%"
      style={{
        padding: '1rem',
        boxSizing: 'border-box',
        gridTemplateColumns: '1fr 2fr 1fr',
      }}
    >
      <View style={{ backgroundColor: 'lightblue', padding: '1rem' }}>
        Columna 1
      </View>
      <View style={{ padding: '1rem' }}>
        Columna 2
        {showInstructions && (
          <Instructions
            Messages={Messages}
            onContinue={handleContinue}
          />
        )}
      </View>
      <View style={{ backgroundColor: 'lightcoral', padding: '1rem' }}>
        Columna 3
      </View>
    </Grid>
  );
};

export default Body;
