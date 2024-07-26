import { handleGithubLogin, handleLogin } from '@/lib/action';
import styles from './login.module.css';

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
      <form action={handleLogin}>
        <input type='text' placeholder='username' name='username' />
        <input type='text' placeholder='password' name='password' />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
