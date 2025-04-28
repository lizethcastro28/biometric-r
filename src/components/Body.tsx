import React, { useState } from 'react';
import { Grid, View, Heading, Divider } from '@aws-amplify/ui-react';
import Instructions from '../components/Instructions';
import SignaturePad from '../components/SignaturePad';

interface BodyProps {
  Messages: any;
}

const Body: React.FC<BodyProps> = ({ Messages }) => {
  const [currentStep, setCurrentStep] = useState<'instructions' | 'signature' | 'finished'>('instructions');

  const handleContinue = () => {
    setCurrentStep('signature');
  };

  const handleSignatureComplete = () => {
    setCurrentStep('finished');
  };

  return (
    <Grid
      className="body-grid"
      gap="1rem"
      width="100%"
      padding="1rem"
      templateColumns={{ base: '1fr', medium: '1fr 2fr 1fr' }}
    >
      <View backgroundColor="lightblue" padding="1rem">
        Columna 1
      </View>

      <View padding="1rem">
        <Heading level={1} textAlign="center" marginBottom="1rem">
          Hola Lorena
        </Heading>

        <Divider orientation="horizontal" size="large" marginBottom="1rem" />

        {currentStep === 'instructions' && (
          <Instructions
            Messages={Messages}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 'signature' && (
          <SignaturePad
            Messages={Messages}
            onComplete={handleSignatureComplete}
          />
        )}

        {currentStep === 'finished' && (
          <Heading level={2} textAlign="center" marginTop="2rem">
            ¡Firma guardada exitosamente!
          </Heading>
        )}
      </View>

      <View backgroundColor="lightcoral" padding="1rem">
        Columna 3
      </View>
    </Grid>
  );
};

export default Body;
