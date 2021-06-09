import { GetStaticProps, GetStaticPaths } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { SkipNavContent } from '@reach/skip-nav';
import redis from '@lib/redis';

import Page from '@components/layout/page';
import HomeContent from '@components/index';
import { TicketShareProps } from '@lib/types';
import { SITE_URL, SITE_NAME, META_DESCRIPTION, SAMPLE_TICKET_NUMBER, TITLE } from '@lib/constants';

const TicketShare = ({ username, ticketNumber, name, usernameFromParams }: TicketShareProps) => {
  if (!ticketNumber) {
    return <Error statusCode={404} />;
  }

  const meta = username
    ? {
        title: `${name}’s ${SITE_NAME} Ticket`,
        description: META_DESCRIPTION,
        image: `/api/ticket-images/${username}`,
        url: `${SITE_URL}/tickets/${username}`
      }
    : {
        title: TITLE,
        description: META_DESCRIPTION,
        image: `/api/ticket-images/${usernameFromParams}`,
        url: `${SITE_URL}/tickets/${usernameFromParams}`
      };

  return (
    <Page meta={meta}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <SkipNavContent />
      <HomeContent
        defaultUserData={{
          username: username || undefined,
          name: name || '',
          ticketNumber
        }}
        sharePage
      />
    </Page>
  );
};

const getStaticProps: GetStaticProps<TicketShareProps> = async ({ params }) => {
  const username = params?.username?.toString() || null;

  if (redis) {
    if (username) {
      const [name, ticketNumber] = await redis.hmget(`user:${username}`, 'name', 'ticketNumber');

      if (ticketNumber) {
        return {
          props: {
            username: username || null,
            usernameFromParams: username || null,
            name: name || username || null,
            ticketNumber: parseInt(ticketNumber, 10) || null
          },
          revalidate: 5
        };
      }
    }
    return {
      props: {
        username: null,
        usernameFromParams: username || null,
        name: null,
        ticketNumber: null
      },
      revalidate: 5
    };
  } else {
    return {
      props: {
        username: null,
        usernameFromParams: username || null,
        name: null,
        ticketNumber: SAMPLE_TICKET_NUMBER
      },
      revalidate: 5
    };
  }
};

const getStaticPaths: GetStaticPaths = async () => {
  return Promise.resolve({
    paths: [],
    fallback: 'blocking'
  });
};

export default TicketShare;
export { getStaticProps, getStaticPaths };
