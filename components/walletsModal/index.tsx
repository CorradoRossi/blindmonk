import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import React, { useEffect, useState } from "react";

import { injected } from "./connectors";
import { SUPPORTED_WALLETS } from "./wallets";

import { isMobile } from "react-device-detect";
import usePrevious from "../../hooks/usePrevious";

import Option from "./Option";
import PendingView from "./PendingView";
import { QrcodeOutline, X } from "heroicons-react";
import Image from "@/app/core/components/Image";
import { StageSpinner } from "react-spinners-kit";
import { logError } from "../../utils/sentry";
import { event } from "../../utils/gtag";

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

export default function WalletModal({ close }) {
  const { active, account, connector, activate, error } = useWeb3React();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  const [pendingWallet, setPendingWallet] =
    useState<AbstractConnector | undefined>();
  const [pendingError, setPendingError] = useState<boolean>();
  const previousAccount = usePrevious(account);

  useEffect(() => {
    if (account && !previousAccount) {
      close();
    }
  }, [account, previousAccount]);

  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);

  useEffect(() => {
    if (
      (active && !activePrevious) ||
      (connector && connector !== connectorPrevious && !error)
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [
    setWalletView,
    active,
    error,
    connector,
    activePrevious,
    connectorPrevious,
  ]);

  const tryActivation = async (
    connector: AbstractConnector | undefined,
    connectorName: string
  ) => {
    let name = "";
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true)
        .then(() => {
          event({ action: "wallet_connect", category: connectorName });
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector); // a little janky...can't use setError because the connector isn't set
          } else {
            setPendingError(true);
            logError(error);
          }
        });
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window["ethereum"] && window["ethereum"].isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      // check for mobile options
      if (isMobile) {
        if (!window["web3"] && !window["ethereum"] && option.mobile) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector, option.name);
              }}
              id={`connect-${key}`}
              key={key}
              link={option.href}
              header={option.name}
              icon={option.iconName}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window["web3"] || window["ethereum"])) {
          if (option.name === "MetaMask") {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                header={"Install Metamask"}
                link={"https://metamask.io/"}
                icon={"metamask"}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === "MetaMask" && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === "Injected" && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector, option.name);
            }}
            key={key}
            link={option.href}
            header={option.name}
            icon={option.iconName}
          />
        )
      );
    });
  }

  function getModalContent() {
    if (error) {
      return (
        <>
          <div className="relative overflow-hidden h-32">
            <div
              className="z-10 absolute top-0 right-0 p-3 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={() => close()}
              onClick={() => close()}
            >
              <X />
            </div>
            <Image src="/default.png" alt="background" />
            <div className="mx-auto flex items-start justify-center absolute top-0 w-full h-full">
              <img
                className="w-48"
                src="https://i.giphy.com/media/Yf7kN6Xdle87K/giphy.webp"
                alt="celebrate"
              />
            </div>
          </div>
          <div className="p-6">
            <div className="mb-2 font-black uppercase">
              {error instanceof UnsupportedChainIdError
                ? "Incompatible network "
                : "Error connecting"}
            </div>
            <div>
              {error instanceof UnsupportedChainIdError ? (
                <h5>Please connect to the Ethereum mainnet to continue.</h5>
              ) : (
                <h5>Error connecting. Try refreshing the page.</h5>
              )}
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="relative overflow-hidden h-24">
          <div
            className="z-10 absolute top-0 right-0 p-3 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={() => close()}
            onClick={() => close()}
          >
            <X />
          </div>
          <Image src="/default.png" alt="background" />
          <div className="flex items-center justify-center absolute w-full h-full">
            {walletView === WALLET_VIEWS.ACCOUNT ? (
              <div className="font-inter font-black uppercase mt-2 flex flex-col items-center">
                <QrcodeOutline className="mb-2" />
                <p>Connect Wallet</p>
              </div>
            ) : null}
            {walletView === WALLET_VIEWS.PENDING && (
              <div className="font-inter font-black uppercase mt-2 flex flex-col items-center">
                <div className="mb-3">
                  <StageSpinner size={18} color="#000" />
                </div>
                <p>Connecting...</p>
              </div>
            )}
          </div>
        </div>
        <div className="text-center p-6">
          <div>
            {walletView === WALLET_VIEWS.PENDING ? (
              <PendingView
                connector={pendingWallet}
                error={pendingError}
                setPendingError={setPendingError}
                tryActivation={tryActivation}
              />
            ) : (
              <div>{getOptions()}</div>
            )}
            {walletView !== WALLET_VIEWS.PENDING && (
              <div className="pt-6 pb-2 text-sm">
                <span>
                  <b>New to Ethereum? &nbsp;</b>
                </span>
                <a className="underline" href="https://ethereum.org/wallets/">
                  Learn more about wallets
                </a>
              </div>
            )}
            {walletView !== WALLET_VIEWS.ACCOUNT ? (
              <div className="border p-2 mt-2 hover:border-gray-800 cursor-pointer">
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {
                    setPendingError(false);
                    setWalletView(WALLET_VIEWS.ACCOUNT);
                  }}
                  onClick={() => {
                    setPendingError(false);
                    setWalletView(WALLET_VIEWS.ACCOUNT);
                  }}
                >
                  Back
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => close()}
        className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-80"
        onClick={() => close()}
      />
      <div className="bg-white rounded-lg w-full overflow-hidden shadow-lg max-w-sm border-gray-800 relative mx-4">
        {getModalContent()}
      </div>
    </div>
  );
}
