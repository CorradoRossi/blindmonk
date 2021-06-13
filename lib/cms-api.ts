import { Job, Sponsor, Platform, Collectible } from '@lib/types';
import * as datoCmsApi from './dato/dato';

let cmsApi: {
  getAllCollectibles: () => Promise<Collectible[]>;
  getAllPlatforms: () => Promise<Platform[]>;
  getAllSponsors: () => Promise<Sponsor[]>;
  getAllJobs: () => Promise<Job[]>;
};

if (process.env.DATOCMS_FULL_API_TOKEN) {
  cmsApi = datoCmsApi;
} else {
  cmsApi = {
    getAllCollectibles: async () => [],
    getAllPlatforms: async () => [],
    getAllSponsors: async () => [],
    getAllJobs: async () => []
  };
}

export async function getAllCollectibles(): Promise<Collectible[]> {
  return cmsApi.getAllCollectibles();
}

export async function getAllPlatforms(): Promise<Platform[]> {
  return cmsApi.getAllPlatforms();
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return cmsApi.getAllSponsors();
}

export async function getAllJobs(): Promise<Job[]> {
  return cmsApi.getAllJobs();
}
