import { GetStaticProps } from 'next';

import Page from '@components/page';
import SpeakersGrid from '@components/speakers-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllSpeakers } from '@lib/cms-api';
import { Speakers } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

const Collection = ({ speakers }: Speakers) => {
  const meta = {
    title: 'Blindmonk',
    description: META_DESCRIPTION
  };
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Collection" description={meta.description} />
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
