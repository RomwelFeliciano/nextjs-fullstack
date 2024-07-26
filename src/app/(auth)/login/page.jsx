import { handleGithubLogin } from '@/lib/action';
import LoginForm from '@/components/loginForm/LoginForm';
import styles from './login.module.css';

export const metadata = {
  title: 'Login Page',
  description: 'Login description',
};

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
