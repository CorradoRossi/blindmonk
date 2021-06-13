import { GetStaticProps } from 'next';

import Page from '@components/layout/page';
import Schedule from '@components/schedule/schedule';
import Layout from '@components/layout/layout';
import Header from '@components/layout/header';

import { getAllPlatforms } from '@lib/cms-api';
import { ScheduleProps } from '@lib/types';
import { META } from '@lib/constants';

const SchedulePage = ({ allPlatforms }: ScheduleProps) => {
  return (
    <Page meta={META}>
      <Layout>
        <Header hero="Wallet" description={META.description} />
        <Schedule allPlatforms={allPlatforms} />
      </Layout>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<ScheduleProps> = async () => {
  const allPlatforms = await getAllPlatforms();

  return {
    props: {
      allPlatforms
    },
    revalidate: 60
  };
};

export default SchedulePage;
