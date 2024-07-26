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
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
