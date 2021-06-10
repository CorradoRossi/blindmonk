import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import Layout from '@components/layout/layout';
import CollectionItem from '@components/collection/collection-item';

import { META } from '@lib/constants';
import { getAllCollectibles } from '@lib/cms-api';
import { Collectible, CollectionPageProps } from '@lib/types';

const CollectibleWrapper = ({ collectible }: CollectionPageProps) => {
  return (
    <Page meta={META}>
      <Layout>
        <CollectionItem collectible={collectible} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<CollectionPageProps> = async ({ params }) => {
  const slug = params?.slug;
  const collectibles = await getAllCollectibles();
  const currentCollectible = collectibles.find((s: Collectible) => s.slug === slug) || null;

  if (!currentCollectible) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      collectible: currentCollectible
    },
    revalidate: 60
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const collectibles = await getAllCollectibles();
  const slugs = collectibles.map((s: Collectible) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};

export default CollectibleWrapper;
export { getStaticProps, getStaticPaths };
