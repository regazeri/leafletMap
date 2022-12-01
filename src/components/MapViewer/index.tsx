import * as React from 'react';

import { LeafletMap } from '../LeafletMap';
import { LocationSubmitForm } from '../ManualSubmitForm';

/** 
 * @description container for map and form
*/
export const MapViewer: React.FC = () => {
  return (
    <>
      <LocationSubmitForm />
      <LeafletMap />
    </>
  );
};
