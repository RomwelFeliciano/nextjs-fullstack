import Link from 'next/link';
import Links from './links/Links';
import styles from './navbar.module.css';
import { auth } from '@/lib/auth';

const Navbar = async () => {
  const session = await auth();

  // Since session is not real time login admin for the project won't have a navbar so logout button will be provided

  return (
    <div className={styles.container}>
      <Link href='/' className={styles.logo}>
        Logo
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
