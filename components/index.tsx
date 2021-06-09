import { useState, useEffect } from 'react';
import { HomeDataContext } from '@lib/hooks/use-conf-data';
import { PageState, HomeProps, UserData } from '@lib/types';
//import Ticket from './ticket/ticket';
//import LearnMore from './learn-more';
import Layout from './layout';
import HomeContainer from './home-container';
import Hero from './hero';
import Form from './form';
import { useWeb3React } from '@web3-react/core';
import useETHBalance from '@lib/hooks/useEthBalance';

const HomeContent = ({
  defaultUserData,
  sharePage,
  defaultPageState = 'registration'
}: HomeProps) => {
  const { account, library, chainId } = useWeb3React<Object>();
  const { data } = useETHBalance(account);

  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [ethAccount, setEthAccount] = useState(account || '');
  const [ethData, setEthData] = useState(data || 0);

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
