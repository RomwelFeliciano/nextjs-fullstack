'use client';

import { useState } from 'react';
import styles from './links.module.css';
import NavLink from './navLink/NavLink';
import Image from 'next/image';
import { handleLogout } from '../../../lib/action';

const links = [
  {
    title: 'Homepage',
    path: '/',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
];

const Links = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogout();

      if (response?.error) {
        console.error(response.error);
      } else {
        // Manually clear the cookies
        Cookies.remove('__Secure-authjs.session-token'); // Adjust the cookie name based on your setup
        router.push('/login');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user.isAdmin && (
              <NavLink item={{ title: 'Admin', path: '/admin' }} />
            )}
            <form onSubmit={handleSignOut}>
              <button type='submit' className={styles.logout}>
                Logout
              </button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: 'Login', path: '/login' }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src='/menu.png'
        alt=''
        width={30}
        height={30}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
