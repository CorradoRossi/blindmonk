import React from 'react';
import cn from 'classnames';
import { QrcodeIcon } from '@heroicons/react/solid';
import { WalletProps } from '@lib/types';
import styles from 'styles/layout.module.css';

const Wallets = ({ provider, loadWeb3Modal, logoutOfWeb3Modal }: WalletProps) => {
  return (
    <>
      <button
        type="button"
        className={cn(styles.submit, styles.register, styles.default)}
        onClick={!provider ? () => loadWeb3Modal() : () => logoutOfWeb3Modal()}
      >
        <QrcodeIcon height="20" width="20" className="mr-2" />
        <span
          style={{
            textShadow:
              '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.5)'
          }}
        >
          {!provider ? 'Connect Wallet' : 'Disconnect Wallet'}
        </span>
      </button>
    </>
  );
};

export default Wallets;
