import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { locationsQueryOptions } from '../api/locations';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

export const Route = createLazyFileRoute('/locations')({
  component: Locations,
  pendingComponent: Loading,
});

function Locations() {
  const locationsQuery = useSuspenseQuery(locationsQueryOptions);
  const result = locationsQuery.data;

  function renderLocations() {
    if (result.isError) {
      return <ErrorMessage />;
    }
    if (!result.data?.length) {
      return 'There is no location to display.';
    }
    return result.data.map((location) => (
      <li>
        <Link>{location.name}</Link>
      </li>
    ));
  }

  return (
    <>
      <h2>Locations</h2>
      <ul>{renderLocations()}</ul>
    </>
  );
}
