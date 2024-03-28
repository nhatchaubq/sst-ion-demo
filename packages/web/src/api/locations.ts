import { queryOptions } from '@tanstack/react-query';
import { ApiResponse } from 'core/types';
import type { Location } from 'core/types';

const LOCATIONS_API_URL = import.meta.env.VITE_API_URL + '/locations';

export const locationsQueryOptions = queryOptions({
  queryKey: ['locations'],
  queryFn: () => getAllLocations(),
});

async function getAllLocations() {
  const response = await fetch(LOCATIONS_API_URL);
  return (await response.json()) as ApiResponse<Location[]>;
}
