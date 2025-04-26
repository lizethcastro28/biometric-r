// src/components/Body.tsx
import React from 'react';
import { Grid, View } from '@aws-amplify/ui-react';

const Body: React.FC = () => {
  return (
    <Grid
      className="body-grid"
      gap="1rem"
      width="100%"
      style={{ padding: '1rem', boxSizing: 'border-box' }}
    >
      <View style={{ backgroundColor: 'lightblue', padding: '1rem' }}>Columna 1</View>
      <View style={{ backgroundColor: 'lightgreen', padding: '1rem' }}>Columna 2</View>
      <View style={{ backgroundColor: 'lightcoral', padding: '1rem' }}>Columna 3</View>
    </Grid>
  );
};

export default Body;