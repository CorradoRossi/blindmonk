import React, { useState } from 'react';
import WalletModal from 'components/walletsModal';
import LoadingDots from 'components/loading-dots';
import { createPortal } from 'react-dom';
import { QrcodeIcon } from '@heroicons/react/solid';
import { WalletProps } from '@lib/types';

const Wallets = ({
  className,
  text,
  disabled,
  modalOpen,
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal
}: WalletProps) => {
  const [open, setOpen] = useState(modalOpen || false);
  const body = document.getElementsByTagName('body')[0];

  const WalletPortal = () => {
    return createPortal(<WalletModal close={() => setOpen(false)} />, body);
  };

  const handleOnClick = () => {
    if (!provider) {
      //setOpen(true);
      loadWeb3Modal();
    } else {
      //setOpen(false);
      logoutOfWeb3Modal();
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={className}
        onClick={!provider ? () => loadWeb3Modal() : () => logoutOfWeb3Modal()}
      >
        <QrcodeIcon height="20" width="20" className="mr-2" />
        <span>{text}</span>
      </button>
      {open && <WalletPortal />}
    </>
  );
};

export default Wallets;
