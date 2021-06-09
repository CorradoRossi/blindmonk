import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import SpeakerSection from '@components/speaker-section';
import Layout from '@components/layout/layout';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker, ProfilePageProps } from '@lib/types';
import { META } from '@lib/constants';

const ProfilePage = ({ speaker }: ProfilePageProps) => {
  return (
    <Page meta={META}>
      <Layout>
        <SpeakerSection speaker={speaker} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<ProfilePageProps> = async ({ params }) => {
  const slug = params?.slug;
  const speakers = await getAllSpeakers();
  const currentSpeaker = speakers.find((s: Speaker) => s.slug === slug) || null;

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
  const slugs = speakers.map((s: Speaker) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};

export default ProfilePage;
export { getStaticProps, getStaticPaths };
