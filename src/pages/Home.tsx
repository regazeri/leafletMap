import * as React from 'react';
import { CssBaseline, ThemeProvider, Grid } from '@mui/material';
import { GeoIndicatorContainer, MapViewer } from '@root/components';
import { theme } from '@root/theme';

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <GeoIndicatorContainer />
        </Grid>
        <Grid item xs={6} md={8}>
          <MapViewer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Home;
