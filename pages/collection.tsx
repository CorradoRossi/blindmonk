import Page from '@components/layout/page';
import CollectionGrid from '@components/collection/collection-grid';
import Layout from '@components/layout/layout';
import Header from '@components/layout/header';
import { META } from '@lib/constants';

const Collection = () => {
  return (
    <Page meta={META}>
      <Layout>
        <Header hero="Collection" description={META.description} />
        <CollectionGrid />
      </Layout>
    </Page>
  );
};

export default Collection;
