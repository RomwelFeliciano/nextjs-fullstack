import { handleGithubLogin } from '@/lib/action';

export const metadata = {
  title: 'Login Page',
  description: 'Login description',
};

const LoginPage = () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
    </div>
  );
};

export default LoginPage;
