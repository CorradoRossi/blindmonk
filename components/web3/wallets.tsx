import React from 'react';
import { QrcodeIcon } from '@heroicons/react/solid';
import { WalletProps } from '@lib/types';
import useEagerConnect from '@lib/hooks/useEagerConnect';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const Wallets = ({
  className,
  disabled,
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal
}: WalletProps) => {
  const triedEagerConnect = useEagerConnect();
  const { activate, deactivate, connector }: any = useWeb3React<Object>();

  const connect = () => {
    activate();
    // @ts-ignore
    if (!connector instanceof InjectedConnector) {
      return;
    } else {
      console.log('activate from other method');
    }
  };

  const disconnect = () => {
    deactivate();
    // @ts-ignore
    if (!connector instanceof InjectedConnector) {
      connector.close();
    }
  };

  const handleOnClick = () => {
    if (!provider) {
      connect();
      loadWeb3Modal();
      return;
    }
    disconnect();
    logoutOfWeb3Modal();
  };

  if (!triedEagerConnect) {
    return null;
  }
  return (
    <>
      <button type="button" disabled={disabled} className={className} onClick={handleOnClick}>
        <QrcodeIcon height="20" width="20" className="mr-2" />
        <span>{!provider ? 'Connect Wallet' : 'Disconnect Wallet'}</span>
      </button>
    </>
  );
};

export default Wallets;
