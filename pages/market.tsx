import { GetStaticProps } from 'next';

import Page from '@components/page';
import SponsorsGrid from '@components/sponsors-grid';
import Header from '@components/header';
import Layout from '@components/layout';

import { getAllSponsors } from '@lib/cms-api';
import { MarketPageProps } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

const MarketPage = ({ sponsors }: MarketPageProps) => {
  const meta = {
    title: 'Blindmonk',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Market" description={meta.description} />
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
