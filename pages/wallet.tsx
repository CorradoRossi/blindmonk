import { GetStaticProps } from 'next';

import Page from '@components/layout/page';
import Schedule from '@components/schedule';
import Layout from '@components/layout/layout';
import Header from '@components/layout/header';

import { getAllStages } from '@lib/cms-api';
import { ScheduleProps } from '@lib/types';
import { META } from '@lib/constants';

const SchedulePage = ({ allStages }: ScheduleProps) => {
  return (
    <Page meta={META}>
      <Layout>
        <Header hero="Wallet" description={META.description} />
        <Schedule allStages={allStages} />
      </Layout>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<ScheduleProps> = async () => {
  const allStages = await getAllStages();

  return {
    props: {
      allStages
    },
    revalidate: 60
  };
};

export default SchedulePage;
