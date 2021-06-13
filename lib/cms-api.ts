import { Job, Sponsor, Stage, Collectible } from '@lib/types';
import * as datoCmsApi from './dato/dato';

let cmsApi: {
  getAllCollectibles: () => Promise<Collectible[]>;
  getAllStages: () => Promise<Stage[]>;
  getAllSponsors: () => Promise<Sponsor[]>;
  getAllJobs: () => Promise<Job[]>;
};

if (process.env.DATOCMS_FULL_API_TOKEN) {
  cmsApi = datoCmsApi;
} else {
  cmsApi = {
    getAllCollectibles: async () => [],
    getAllStages: async () => [],
    getAllSponsors: async () => [],
    getAllJobs: async () => []
  };
}

export async function getAllCollectibles(): Promise<Collectible[]> {
  return cmsApi.getAllCollectibles();
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
