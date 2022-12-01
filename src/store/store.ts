import create from 'zustand';

export interface ILocation {
  lat: number;
  lng: number;
  elevation: number| string;
  description: string;
  errorMessage?: string;
}

interface ICoordinates {
  locations: ILocation[];
  submitLocation: (data: ILocation) => void;
}

export const useStore = create<ICoordinates>((set) => ({
  // initial state
  locations: [],
  // methods for manipulating state
  submitLocation: (newLocation: ILocation) => {
    set((state) => ({
      locations: [...state.locations, newLocation],
    }));
  },
}));
