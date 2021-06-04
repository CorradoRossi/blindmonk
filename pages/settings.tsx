import { GetStaticProps } from 'next';

import Page from '@components/page';
import JobsGrid from '@components/jobs-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllJobs } from '@lib/cms-api';
import { Job } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

type Props = {
  jobs: Job[];
};

export default function Jobs({ jobs }: Props) {
  const meta = {
    title: 'Blindmonk',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Settings" description={meta.description} />
        <JobsGrid jobs={jobs} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const jobs = await getAllJobs();

  return {
    props: {
      jobs
    },
    revalidate: 60
  };
};
