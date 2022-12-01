import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { ILocation } from '@root/store/store';

type IProps = {
  data: ILocation;
  icon: string;
};

const style = {
  card: { display: 'flex', margin: '5px 10px', height: '80px', backgroundColor: '#0b2d39' },
  image: { display: 'block', height: '40px', width: '10%', margin: 'auto', alignItems: 'center', padding: '0 7px' },
  cardContent: { display: 'flex', flexDirection: 'column', color: '#ffff', flexGrow: 1 },
  text: { color: '#ffff', padding: '3px 3px 5px 0' },
};
export const CustomCard: React.FC<IProps> = ({ data, icon }) => {
  const { lat, lng, elevation, description, errorMessage } = data;
  return (
    <Card sx={style.card}>
      <div style={{ width: '10px', backgroundColor: errorMessage ? '#E00f30' : '#49be25' }}></div>
      <img src="/marker.png" alt="marker" loading="lazy" style={style.image} />
      <CardContent sx={style.cardContent}>
        <div>
          <Typography component="div" variant="h5">
            description:
            <Typography sx={{ paddingLeft: '10px' }} variant="h6" component="span">
              {description}
            </Typography>
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography sx={style.text} variant="subtitle1" component="div">
            lat:{lat.toFixed(3)}
          </Typography>
          <Typography sx={style.text} variant="subtitle1" component="div">
            lng:{lng.toFixed(3)}
          </Typography>
          <Typography sx={style.text} variant="subtitle1" component="div">
            elevation:{typeof elevation === 'number'? elevation.toFixed(2):elevation}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
