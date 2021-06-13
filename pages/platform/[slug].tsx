import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import Layout from '@components/layout/layout';
import PlatformContainer from '@components/schedule/platform-container';

import { META } from '@lib/constants';
import { getAllPlatforms } from '@lib/cms-api';
import { Platform, PlatformPageProps } from '@lib/types';

const PlatformPage = ({ platform, allPlatforms }: PlatformPageProps) => {
  return (
    <Page meta={META} fullViewport>
      <Layout>
        <PlatformContainer platform={platform} allPlatforms={allPlatforms} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<PlatformPageProps> = async ({ params }) => {
  const slug = params?.slug;
  const platforms = await getAllPlatforms();
  const platform = platforms.find((s: Platform) => s.slug === slug) || null;

  if (!platform) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      platform,
      allPlatforms: platforms
    },
    revalidate: 60
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const platforms = await getAllPlatforms();
  const slugs = platforms.map((s: Platform) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};

export default PlatformPage;
export { getStaticProps, getStaticPaths };
