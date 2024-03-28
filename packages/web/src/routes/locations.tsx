import { createFileRoute } from '@tanstack/react-router';
import { locationsQueryOptions } from '../api/locations';

export const Route = createFileRoute('/locations')({
  loader: ({context}) => context.query.ensureQueryData(locationsQueryOptions),
});