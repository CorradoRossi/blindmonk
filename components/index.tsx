import { useState, useEffect } from 'react';
import { HomeDataContext } from '@lib/hooks/use-home-data';
import { PageState, HomeProps, UserData } from '@lib/types';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import useETHBalance from '@lib/hooks/useEthBalance';
import HomeContainer from './home/home-container';
import Layout from './layout/layout';
import Hero from './home/hero';
import Form from './form/form';

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { account, library, chainId, deactivate, connector }: any = useWeb3React<Object>();
  const { data } = useETHBalance(account);

  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [ethAccount, setEthAccount] = useState(account || '');
  const [ethData, setEthData] = useState(data || 0);

  const disconnect = () => {
    deactivate();
    // @ts-ignore
    if (!connector instanceof InjectedConnector) {
      connector.close();
    }
  };

  useEffect(() => {
    setEthAccount(account);
    setEthData(data);
  }, [account, data]);

  useEffect(() => {
    setEthAccount(account);
    setEthData(data);
  }, []);

  return (
    <HomeDataContext.Provider
      value={{
        userData,
        setUserData,
        setPageState
      }}
    >
      <Layout>
        <HomeContainer>
          {ethAccount ? (
            <>
              <div>
                <h1>{ethAccount ? ethAccount : ''}</h1>
                <h1>{ethData ? ethData : ''}</h1>
                <button onKeyDown={disconnect} onClick={disconnect}>
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <>
              <Hero />
              <Form />
            </>
          )}
        </HomeContainer>
      </Layout>
    </HomeDataContext.Provider>
  );
};

export default HomeContent;
