import { useState, useEffect } from 'react';
import { HomeDataContext } from '@lib/hooks/use-home-data';
import { PageState, HomeProps, UserData } from '@lib/types';
import Layout from './layout/layout';
import HomeContainer from './home/home-container';
import Hero from './home/hero';
import Form from './form/form';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import useETHBalance from '@lib/hooks/useEthBalance';
//import Ticket from './ticket/ticket';

const HomeContent = ({
  defaultUserData,
  sharePage,
  defaultPageState = 'registration'
}: HomeProps) => {
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
    // @ts-ignore
    setEthAccount(account);
    setEthData(data);
  }, [account, data]);

  useEffect(() => {
    // @ts-ignore
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

//<Ticket
//  username={userData.username}
//  name={userData.name}
//  ticketNumber={userData.ticketNumber}
//  sharePage={sharePage}
///>
