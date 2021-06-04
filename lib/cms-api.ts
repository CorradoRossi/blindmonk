import { Job, Sponsor, Stage, Speaker } from '@lib/types';

import * as strapiApi from './cms-providers/strapi';
import * as agilityApi from './cms-providers/agility';
import * as datoCmsApi from './cms-providers/dato';
import * as contentfulApi from './cms-providers/contentful';
import * as prismicApi from './cms-providers/prismic';
import * as storyblokApi from './cms-providers/storyblok';

let cmsApi: {
  getAllSpeakers: () => Promise<Speaker[]>;
  getAllStages: () => Promise<Stage[]>;
  getAllSponsors: () => Promise<Sponsor[]>;
  getAllJobs: () => Promise<Job[]>;
};

if (process.env.DATOCMS_READ_ONLY_API_TOKEN) {
  cmsApi = datoCmsApi;
} else if (process.env.CONTENTFUL_ACCESS_TOKEN && process.env.CONTENTFUL_SPACE_ID) {
  cmsApi = contentfulApi;
} else if (process.env.STORYBLOK_PREVIEW_TOKEN) {
  cmsApi = storyblokApi;
} else if (process.env.PRISMIC_REPO_ID) {
  cmsApi = prismicApi;
} else if (
  process.env.AGILITY_GUID &&
  process.env.AGILITY_API_FETCH_KEY &&
  process.env.AGILITY_API_PREVIEW_KEY
) {
  cmsApi = agilityApi;
} else if (process.env.STRAPI_API_URL) {
  cmsApi = strapiApi;
} else {
  cmsApi = {
    getAllSpeakers: async () => [],
    getAllStages: async () => [],
    getAllSponsors: async () => [],
    getAllJobs: async () => []
  };
}

export async function getAllSpeakers(): Promise<Speaker[]> {
  return cmsApi.getAllSpeakers();
}

export async function getAllStages(): Promise<Stage[]> {
  return cmsApi.getAllStages();
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return cmsApi.getAllSponsors();
}

export async function getAllJobs(): Promise<Job[]> {
  return cmsApi.getAllJobs();
}
