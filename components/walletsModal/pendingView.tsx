import { AbstractConnector } from '@web3-react/abstract-connector';
import React from 'react';
import Option from './Option';
import { SUPPORTED_WALLETS } from './wallets';
import { injected } from './connectors';

const PendingView = ({
  connector,
  error = false
}: {
  connector?: AbstractConnector;
  error?: boolean;
  setPendingError: (error: boolean) => void;
  tryActivation: (connector: AbstractConnector, connectorName: string) => void;
}) => {
  // @ts-ignore
  const isMetamask = window['ethereum'] && window['ethereum'].isMetaMask;

  return (
    <div>
      {Object.keys(SUPPORTED_WALLETS).map(key => {
        const option = SUPPORTED_WALLETS[key];
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null;
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null;
            }
          }
          return (
            <Option id={`connect-${key}`} key={key} header={option.name} icon={option.iconName} />
          );
        }
        return null;
      })}
      {error ? (
        <div className="bg-red-100 p-3 rounded-sm text-red-800 mb-3">
          <div>Error connecting.</div>
        </div>
      ) : null}
    </div>
  );
};

export default PendingView;
