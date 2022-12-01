import axios from 'axios';
import { useQuery } from 'react-query';

import { API_QUERY_NAME, BASE_API_URL } from '@root/common/constant';

export const fetchElevation = (lat: number, lon: number) =>
  axios.get(`${BASE_API_URL}${lat},${lon}`).then((res) => res.data);

export default function useElevation(lat: number, lon: number) {
  return useQuery([API_QUERY_NAME, lat, lon], () => fetchElevation(lat, lon), {
    refetchOnWindowFocus: false,
    enabled: false,
  });
}
