import * as React from 'react';
import { Box } from '@mui/material';

import { CustomCard } from '../CostumComponents';
import { ILocation, useStore } from '@root/store/store';

/** 
 * @description component is container for wrapping GeoLocation card
*/

const style = {
  root: { display: 'flex', flexDirection: 'column', backgroundColor: '#113d61', minHeight: '100vh', overflow: 'auto' },
};

export const GeoIndicatorContainer: React.FC = () => {
  const { locations } = useStore();
  return (
    <Box sx={style.root}>
      <span style={{color:'#ffff',padding:'10px'}}>{'Geolocation Data'}</span>
      {locations
        && locations.map((location: ILocation, idx: number) => <CustomCard key={idx} data={location} icon="default" />)
        }
    </Box>
  );
};
