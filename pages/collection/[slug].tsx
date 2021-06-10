import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import Layout from '@components/layout/layout';
import CollectionItem from '@components/collection/collection-section';

import { META } from '@lib/constants';
import { getAllSpeakers } from '@lib/cms-api';
import { Collectible, CollectionPageProps } from '@lib/types';

const CollectibleWrapper = ({ speaker }: CollectionPageProps) => {
  return (
    <Page meta={META}>
      <Layout>
        <CollectionItem speaker={speaker} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<CollectionPageProps> = async ({ params }) => {
  const slug = params?.slug;
  const speakers = await getAllSpeakers();
  const currentSpeaker = speakers.find((s: Collectible) => s.slug === slug) || null;

  if (!currentSpeaker) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      speaker: currentSpeaker
    },
    revalidate: 60
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const speakers = await getAllSpeakers();
  const slugs = speakers.map((s: Collectible) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};

export default CollectibleWrapper;
export { getStaticProps, getStaticPaths };
