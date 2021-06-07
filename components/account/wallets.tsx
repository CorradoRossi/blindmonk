import React, { useState } from 'react';
import WalletModal from 'components/walletsModal';
import { createPortal } from 'react-dom';
import { QrcodeIcon } from '@heroicons/react/solid';

const Wallets = ({
  className,
  text,
  modalOpen
}: {
  className: string;
  text?: string;
  modalOpen?: boolean;
}) => {
  const [open, setOpen] = useState(modalOpen || false);
  const body = document.getElementsByTagName('body')[0];

  const WalletPortal = () => {
    return createPortal(<WalletModal close={() => setOpen(false)} />, body);
  };

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(open => !open)}>
        <QrcodeIcon height="20" width="20" className="mr-2" />
        <span>{text || 'Connect Wallet'}</span>
      </button>
      {open && <WalletPortal />}
    </>
  );
};

export default Wallets;
