import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, TextField, Button } from '@mui/material';

import { useStore } from '@root/store/store';
import useElevation from '@root/hooks/useElevation';

type FormValues = {
  latitude: number;
  longitude: number;
};

export const Schema = Yup.object().shape({
  latitude: Yup.number().min(-90).max(90).required('This field is required'),
  longitude: Yup.number().min(-180).max(180).required('This field is required'),
});

export const LocationSubmitForm = () => {
  const { submitLocation } = useStore();
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const { data, refetch, isLoading, isRefetching,error } = useElevation(latLng.lat, latLng.lng);

  const formik = useFormik({
    validationSchema: Schema,
    initialValues: {
      latitude: 0,
      longitude: 0,
    },
    onSubmit: (values: FormValues) => {
      setLatLng({ lat: values.latitude, lng: values.longitude });
    },
  });
  useEffect(() => {
    if (latLng.lat !== null && latLng.lng !== null) {
      refetch();
    }
  }, [latLng]);
  useEffect(() => {
    if (data && !isLoading && !isRefetching) {
      const elevation = data.results[0].elevation;
      submitLocation({ lat: latLng.lat, lng: latLng.lng, description: 'Submit By manual Data', elevation });
    }
    if(error) {
      submitLocation({ lat: latLng.lat, lng: latLng.lng, description: 'Submit By manual Data', elevation:'Not provided',errorMessage:'error' });
    }
  }, [data]);

  return (
    <Paper elevation={5} sx={{ width: '95%', margin: '10px auto', padding: '10px', backgroundColor: '#e8edf2' }}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: 'flex', justifyContent: 'center', alignContent: 'flex-start' }}
      >
        <TextField
          sx={{ margin: '5px 10px' }}
          autoComplete={'latitude'}
          type={'number'}
          label={'latitude'}
          {...formik.getFieldProps('latitude')}
          error={Boolean(formik.touched['latitude'] && formik.errors['latitude'])}
          helperText={formik.touched['latitude'] && formik.errors['latitude']}
        />
        <TextField
          sx={{ margin: '5px 10px' }}
          autoComplete={'longitude'}
          type={'number'}
          label={'longitude'}
          {...formik.getFieldProps('longitude')}
          error={Boolean(formik.touched['longitude'] && formik.errors['longitude'])}
          helperText={formik.touched['longitude'] && formik.errors['longitude']}
        />
        <Button
          sx={{ margin: '5px 10px' }}
          variant={'contained'}
          size={'small'}
          color={'primary'}
          type="submit"
          disabled={isRefetching || isLoading}
        >
          manual Submit
        </Button>
      </form>
    </Paper>
  );
};
