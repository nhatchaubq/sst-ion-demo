import { QueryClient } from '@tanstack/react-query';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { AuthContext } from '../hooks/auth';

type RootRouteContext = {
  query: QueryClient;
  auth: AuthContext;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: Root,
});

function Root() {
  const router = useRouterState();
  if (router.location.pathname === '/login') {
    return <Outlet />;
  }
  return (
    <>
      <nav className='flex p-5 gap-3 justify-center items-center'>
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
      <main className='p-5'>
        <Outlet />
      </main>
    </>
  );
}
