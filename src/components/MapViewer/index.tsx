import * as React from 'react';

import { LeafletMap } from '../LeafletMap';
import { LocationSubmitForm } from '../ManualSubmitForm';

export const MapViewer: React.FC = () => {
  return (
    <>
      <LocationSubmitForm />
      <LeafletMap />
    </>
  );
};
