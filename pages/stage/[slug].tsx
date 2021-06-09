import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import StageContainer from '@components/stage-container';
import Layout from '@components/layout/layout';

import { getAllStages } from '@lib/cms-api';
import { Stage, StagePageProps } from '@lib/types';
import { META } from '@lib/constants';

const StagePage = ({ stage, allStages }: StagePageProps) => {
  return (
    <Page meta={META} fullViewport>
      <Layout>
        <StageContainer stage={stage} allStages={allStages} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<StagePageProps> = async ({ params }) => {
  const slug = params?.slug;
  const stages = await getAllStages();
  const stage = stages.find((s: Stage) => s.slug === slug) || null;

  if (!stage) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      stage,
      allStages: stages
    },
    revalidate: 60
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const stages = await getAllStages();
  const slugs = stages.map((s: Stage) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};

export default StagePage;
export { getStaticProps, getStaticPaths };
