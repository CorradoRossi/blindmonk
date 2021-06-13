import { Job, Sponsor, Platform, Collectible } from '@lib/types';
import { API_URL, API_TOKEN } from '@lib/constants';

async function fetchCmsAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllCollectibles(): Promise<Collectible[]> {
  const data = await fetchCmsAPI(`
    {
      allCollectibles(first: 100) {
        name
        bio
        title
        slug
        twitter
        github
        company
        talk {
          title
          description
        }
        image {
          url(imgixParams: {fm: jpg, fit: crop, w: 300, h: 400})
        }
        imageSquare: image {
          url(imgixParams: {fm: jpg, fit: crop, w: 192, h: 192})
        }
      }
    }
  `);

  return data.allCollectibles;
}

export async function getAllPlatforms(): Promise<Platform[]> {
  const data = await fetchCmsAPI(`
    {
      allPlatforms(first: 100, orderBy: order_ASC) {
        name
        slug
        stream
        discord
        schedule {
          title
          start
          end
          collectible {
            name
            slug
            image {
              url(imgixParams: {fm: jpg, fit: crop, w: 120, h: 120})
            }
          }
        }
      }
    }
  `);

  return data.allPlatforms;
}

export async function getLogoImg(): Promise<any> {
  const data = await fetchCmsAPI(`
    {
      allCompanys(first: 100, sortBy: tier_rank_ASC) {
        edges {
          node {
            card_image
            logo
          }
        }
      }
    }
  `);

  const logoImage = data.allCompanys.edges.map((edge: any) => {
    return {
      logo: {
        url: edge.node.logo?.url.replace('compress,format', 'format') || 'https://images.prismic.io'
      }
    };
  });

  return logoImage;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
    {
      allCompanies(first: 100, orderBy: tierRank_ASC) {
        name
        description
        slug
        website
        callToAction
        callToActionLink
        discord
        youtubeSlug
        tier
        links {
          url
          text
        }
        cardImage {
          url(imgixParams: {fm: jpg, fit: crop})
        }
        logo {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
        }
      }
    }
  `);

  return data.allCompanies;
}

export async function getAllJobs(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
    {
      allJobs(first: 100, orderBy: rank_ASC) {
        id
        companyName
        title
        description
        discord
        link
        rank
      }
    }
  `);

  return data.allJobs;
}
