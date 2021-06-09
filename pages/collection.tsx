import { GetStaticProps } from 'next';

import Page from '@components/page';
import SpeakersGrid from '@components/speakers-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllSpeakers } from '@lib/cms-api';
import { Speakers } from '@lib/types';
import { META } from '@lib/constants';

const Collection = ({ speakers }: Speakers) => {
  return (
    <Page meta={META}>
      <Layout>
        <Header hero="Collection" description={META.description} />
        <SpeakersGrid speakers={speakers} />
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
