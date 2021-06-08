import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/page';
import SpeakerSection from '@components/speaker-section';
import Layout from '@components/layout';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker, ProfilePageProps } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

const ProfilePage = ({ speaker }: ProfilePageProps) => {
  const meta = {
    title: 'Blindmonk',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
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
