import { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import { NAVIGATION } from '@lib/constants';
import styles from 'styles/layout.module.css';
import Logo from '../utils/logo';
import MobileMenu from './mobile-menu';
import Footer from './footer';
import { LayoutProps, FormState } from '@lib/types';
import Wallets from '../web3/wallets';
import useWeb3Modal from '@lib/hooks/useWeb3Modal';

const Layout = ({ children, className, hideNav, layoutStyles }: LayoutProps) => {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const router = useRouter();
  const activeRoute = router.asPath;

  return (
    <>
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles['header-logos']}>
              <MobileMenu key={router.asPath} />
              <Link href="/">
                {/* eslint-disable-next-line */}
                <a className={styles.logo}>{<Logo />}</a>
              </Link>
            </div>
            <div className={styles.tabs}>
              {NAVIGATION.map(({ name, route }) => (
                <Link key={name} href={route}>
                  <a
                    className={cn(styles.tab, {
                      [styles['tab-active']]: activeRoute.startsWith(route)
                    })}
                  >
                    {name}
                  </a>
                </Link>
              ))}
            </div>
            <div className={cn(styles['header-right'])}>
              <Wallets
                modalOpen={false}
                provider={provider}
                loadWeb3Modal={loadWeb3Modal}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
              />
            </div>
          </header>
        )}
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          {!activeRoute.startsWith('/platform') && <Footer />}
        </div>
      </div>
    </>
  );
};

export default Layout;
