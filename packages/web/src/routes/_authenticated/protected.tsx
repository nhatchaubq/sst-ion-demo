import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/protected')({
  component: Protected,
});

function Protected() {
  return (
    <>
      <h1>Welcome to Protected Route.</h1>
      <p>
        If you are here, you are supposed to be member and has already logged
        in.
      </p>
    </>
  );
}
