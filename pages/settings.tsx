import { GetStaticProps } from 'next';

import Page from '@components/layout/page';
import JobsGrid from '@components/settings/jobs-grid';
import Layout from '@components/layout/layout';
import Header from '@components/layout/header';

import { getAllJobs } from '@lib/cms-api';
import { JobsProps } from '@lib/types';
import { META } from '@lib/constants';

const Jobs = ({ jobs }: JobsProps) => {
  return (
    <Page meta={META}>
      <Layout>
        <Header hero="Settings" description={META.description} />
        <JobsGrid jobs={jobs} />
      </Layout>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<JobsProps> = async () => {
  const jobs = await getAllJobs();

  return {
    props: {
      jobs
    },
    revalidate: 60
  };
};

export default Jobs;
