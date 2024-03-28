import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/assets')({
  component: Assets,
});

function Assets() {
  return <h2>Assets</h2>;
}
