import React, { Suspense, useEffect, useState } from 'react';
import { invokeWithMiddleware, useParam, useQuery } from 'blitz';
import Header from '@/app/core/components/header/Header';
import axios from 'axios';
import AccountInfo from '@/app/accounts/components/AccountInfo';
import DonationBlock from '@/app/accounts/components/DonationBlock';
import getFullAccount from '@/app/accounts/queries/getFullAccount';
import GhostLayout from '@/app/accounts/components/GhostLayout';
import Image from '@/app/core/components/Image';
import { NextSeo } from 'next-seo';

import UserLists from '@/app/accounts/components/profile/UserLists';
import ProfileTabs from '@/app/accounts/components/profile/tabs/ProfileTabs';
import MobileSupport from '@/app/accounts/components/profile/mobile/MobileSupport';
import useStore from '@/app/store';

export const Account = ({ ssrAccount }) => {
  const [clientSide, setClientSide] = useState(false);
  const accountId = useParam('accountId', 'string');
  const [acc] = useQuery(getFullAccount, { username: accountId }, { initialData: ssrAccount });

  const setEthereumPrice = useStore(state => state.setEthereumPrice);
  const setGasPrice = useStore(state => state.setGasPrice);

  useEffect(() => {
    setClientSide(true);
    axios
      .get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then(response => {
        setEthereumPrice(response.data.ethereum.usd);
      })
      .catch(() => {
        console.error('error fetching ethereum price');
      });

    axios
      .get(
        'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=' +
          process.env.ESTIMATOR_API_KEY
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        setGasPrice(data.result.ProposeGasPrice);
      })
      .catch(() => {
        console.error('error fetching gasPrice');
      });
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        {clientSide && <Header />}
        <div
          className="h-40 sm:h-40 w-100 relative overflow-hidden bg-gray-200"
          style={{ zIndex: -1 }}
        >
          {acc.header_img ? (
            <Image src={acc.header_img} alt={`${acc.username} header image`} priority={true} />
          ) : (
            <Image src="/default.png" alt={`${acc.username} header image`} priority={true} />
          )}
        </div>
        <div className="flex-1">
          <div className="max-w-5xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-5 lg:col-span-3">
                <div className="flex-1 mr-0 lg:mr-8">
                  <AccountInfo acc={acc} />
                  <UserLists accountId={acc.id} />
                  {clientSide && <MobileSupport account={acc} />}
                </div>
              </div>
              <div className="hidden lg:block lg:col-span-2">
                <div className="-mt-16 bg-white p-6 rounded-lg">
                  {clientSide && <DonationBlock refetch={() => {}} account={acc} />}
                </div>
              </div>
            </div>
            <ProfileTabs account={ssrAccount} />
          </div>
        </div>
      </div>
    </>
  );
};

const AccountPage = ({ acc, tags }) => {
  return (
    <>
      <NextSeo
        title={tags.title}
        openGraph={{
          url: tags.url,
          title: tags.title
        }}
      />
      <Suspense fallback={<GhostLayout />}>
        <Account ssrAccount={acc} />
      </Suspense>
    </>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  return invokeWithMiddleware(getFullAccount, { username: params.accountId }, { req, res })
    .then(account => {
      const tags = {
        title: `${account.username} | gasmoney`,
        description: account.bio,
        url: `https://gasmoney.xyz/${account.username}`,
        img: `https://og-image-jamiecarr.vercel.app/gsm.so%2F${account.username}.png?${
          account.header_img ? 'bg=' + encodeURI(account.header_img) + '&' : ''
        }${account.img ? 'images=' + encodeURI(account.img) : null}`
      };

      return {
        props: { acc: account, tags }
      };
    })
    .catch(err => {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    });
};

export default AccountPage;
