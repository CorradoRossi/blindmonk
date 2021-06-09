import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import SponsorSection from '@components/sponsors/sponsor-section';
import Layout from '@components/layout/layout';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor, SponsorPageProps } from '@lib/types';
import { META } from '@lib/constants';

const SponsorPage = ({ sponsor }: SponsorPageProps) => {
  return (
    <Page meta={META}>
      <Layout>
        <SponsorSection sponsor={sponsor} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<SponsorPageProps> = async ({ params }) => {
  const slug = params?.slug;
  const sponsors = await getAllSponsors();
  const sponsor = sponsors.find((s: Sponsor) => s.slug === slug) || null;

  if (!sponsor) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      sponsor
    },
    revalidate: 60
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const sponsors = await getAllSponsors();
  const slugs = sponsors.map((s: Sponsor) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: 'blocking'
  };
};

export default SponsorPage;
export { getStaticProps, getStaticPaths };
