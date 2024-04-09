import { createFileRoute } from '@tanstack/react-router';
import LoginForm from '../components/login/LoginForm';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  return (
    <div className='flex w-full h-full items-center justify-center'>
      <LoginForm />
    </div>
  );
}
