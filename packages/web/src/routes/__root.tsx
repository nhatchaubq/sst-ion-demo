import { QueryClient } from '@tanstack/react-query';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';

type RootRouteContext = {
  query: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <nav className='flex p-5 gap-3'>
        <Link to='/' className='min-w-16 text-center [&.active]:font-bold'>
          Home
        </Link>
        <Link
          to='/locations'
          className='min-w-16 text-center [&.active]:font-bold'>
          Locations
        </Link>
        <Link
          to='/assets'
          className='min-w-16 text-center [&.active]:font-bold'>
          Assets
        </Link>
        <Link to='/about' className='min-w-16 text-center [&.active]:font-bold'>
          About
        </Link>
      </nav>
      <hr />
      <div className='p-5'>
        <Outlet />
      </div>
    </>
  ),
});
