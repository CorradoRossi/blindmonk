import { useState, useEffect } from 'react';
import { HomeDataContext } from '@lib/hooks/use-home-data';
import { PageState, HomeProps, UserData } from '@lib/types';
import { useWeb3React } from '@web3-react/core';
import useETHBalance from '@lib/hooks/useEthBalance';
import HomeContainer from './home/home-container';
import Layout from './layout/layout';
import Hero from './home/hero';
import Form from './form/form';
import Profile from './collection/profile';

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { account }: any = useWeb3React();
  const { data } = useETHBalance(account);
  const assetData = { assets: [] };

  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [ethAccount, setEthAccount] = useState(account || '');
  const [ethData, setEthData] = useState(data || 0);

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
              <Profile account={ethAccount} data={ethData} assets={assetData} />
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
