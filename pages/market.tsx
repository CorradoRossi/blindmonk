import { GetStaticProps } from 'next';

import Page from '@components/layout/page';
import SponsorsGrid from '@components/sponsors/sponsors-grid';
import Header from '@components/layout/header';
import Layout from '@components/layout/layout';

import { getAllSponsors } from '@lib/cms-api';
import { MarketPageProps } from '@lib/types';
import { META } from '@lib/constants';

const MarketPage = ({ sponsors }: MarketPageProps) => {
  return (
    <Page meta={META}>
      <Layout>
        <Header hero="Market" description={META.description} />
        <SponsorsGrid sponsors={sponsors} />
      </Layout>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<MarketPageProps> = async () => {
  const sponsors = await getAllSponsors();

  return {
    props: {
      sponsors
    },
    revalidate: 60
  };
};

export default MarketPage;
