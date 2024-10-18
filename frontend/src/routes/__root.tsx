import { Outlet, createRootRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

function Root() {
  return (
    <div className="w-full h-screen">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRoute({
  component: Root,
});
