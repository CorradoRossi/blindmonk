import React from 'react';

import CoinbaseWalletIcon from './logos/coinbaseWalletIcon';
import MetamaskIcon from './logos/metamaskIcon';
import WalletConnectIcon from './logos/walletConnection';

const getIcon = (icon: any) => {
  switch (icon) {
    case 'metamask':
      return <MetamaskIcon />;
    case 'walletConnect':
      return <WalletConnectIcon />;
    case 'coinbase':
      return <CoinbaseWalletIcon />;
  }
};

export default function Option({
  link = null,
  onClick = null,
  header,
  icon,
  id
}: {
  link?: string | null;
  onClick?: null | (() => void);
  header: React.ReactNode;
  icon?: string | null;
  id: string;
}) {
  const content = (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => onClick && onClick()}
        className="border flex items-center justify-start p-3 mb-2 rounded-sm hover:border-gray-800 cursor-pointer"
        key={id}
        onClick={() => onClick && onClick()}
      >
        <div className="mr-3">{getIcon(icon)}</div>
        <div>{header}</div>
      </div>
    </>
  );
  if (link) {
    return <a href={link}>{content}</a>;
  }

  return content;
}
