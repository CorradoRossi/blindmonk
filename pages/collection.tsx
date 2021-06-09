import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';

import Page from '@components/layout/page';
import SpeakersGrid from '@components/speakers/speakers-grid';
import Layout from '@components/layout/layout';
import Header from '@components/layout/header';

//import { useQuery } from 'blitz';
//import getCreated from '@/app/accounts/queries/getCreated';
//import getCollection from '@/app/accounts/queries/getCollection';

import { getAllSpeakers } from '@lib/cms-api';
import { Speakers } from '@lib/types';
import { META } from '@lib/constants';
import { useWeb3React } from '@web3-react/core';

import fetchAssets from '@lib/fetchAssets';

const Collection = ({ speakers }: Speakers) => {
  const { account: walletAccount } = useWeb3React();
  const rssiDotEthWallet = '0x90c19feA1eF7BEBA9274217431F148094795B074';
  const [localAssets, setLocalAssets] = useState([]);
  const assetList = fetchAssets(rssiDotEthWallet).then((asset: any) => {
    return asset;
  });

  //const assetList = fetchAssets(walletAccount);

  //const [createdAssets] = useQuery(getCreated, {
  //  walletAddress: account.walletAddress,
  //  hidden: account.hidden,
  //  showHidden: walletAccount === account.walletAddress
  //});

  //const [collectedAssets] = useQuery(getCollection, {
  //  walletAddress: account.walletAddress
  //});

  useEffect(() => {
    if (assetList && typeof assetList === 'object' && assetList?.length > 0) {
      setLocalAssets(assetList);
      console.log(localAssets, 'localassets');
    }
  }, [assetList]);

  return (
    <Page meta={META}>
      <Layout>
        <Header hero="Collection" description={META.description} />
        <SpeakersGrid
          speakers={speakers}
          assets={localAssets?.length > 0 ? localAssets : []}
          account={walletAccount}
        />
      </Layout>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Speakers> = async () => {
  const speakers = await getAllSpeakers();

  return {
    props: {
      speakers
    },
    revalidate: 60
  };
};

export default Collection;
