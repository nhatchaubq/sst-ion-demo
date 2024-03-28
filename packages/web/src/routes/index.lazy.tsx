import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>TestWelcome to your one-stop shop for complete asset management.<br/>Gain instant visibility and control over your entire asset portfolio.<br/>Explore our comprehensive tools to easily locate and track your assets across all locations.</h3>
    </div>
  );
}
