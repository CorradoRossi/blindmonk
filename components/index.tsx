import { useState, useEffect } from 'react';
import { PageState, ConfDataContext, UserData } from '@lib/hooks/use-conf-data';
import { ConfProps } from '@lib/types';
//import Ticket from './ticket/ticket';
//import LearnMore from './learn-more';
import Layout from './layout';
import ConfContainer from './conf-container';
import Hero from './hero';
import Form from './form';
import { useWeb3React } from '@web3-react/core';
import useETHBalance from '@lib/hooks/useEthBalance';

const Conf = ({ defaultUserData, sharePage, defaultPageState = 'registration' }: ConfProps) => {
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

    console.log(account);
    console.log(library);
    console.log(chainId);
    console.log(data);
  }, [account, data]);

  useEffect(() => {
    // @ts-ignore
    setEthAccount(account);
    setEthData(data);
  }, []);

  return (
    <ConfDataContext.Provider
      value={{
        userData,
        setUserData,
        setPageState
      }}
    >
      <Layout>
        <ConfContainer>
          {!ethAccount || !ethData ? (
            <>
              <Hero />
              <Form />
            </>
          ) : (
            <>
              <div>
                <h1>{ethAccount ? ethAccount : ''}</h1>
                <h1>{ethData ? ethData : ''}</h1>
              </div>
            </>
          )}
        </ConfContainer>
      </Layout>
    </ConfDataContext.Provider>
  );
};

export default Conf;

//<Ticket
//  username={userData.username}
//  name={userData.name}
//  ticketNumber={userData.ticketNumber}
//  sharePage={sharePage}
///>
