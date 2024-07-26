import { handleRegister } from '@/lib/action';
import styles from './register.module.css';
import RegisterForm from '@/components/registerForm/RegisterForm';

export const metadata = {
  title: 'Register Page',
  description: 'Register description',
};

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <RegisterForm /> */}
        <form className={styles.form} action={handleRegister}>
          <input type='text' placeholder='username' name='username' />
          <input type='email' placeholder='email' name='email' />
          <input type='password' placeholder='password' name='password' />
          <input
            type='password'
            placeholder='confirm password'
            name='confirmPassword'
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
