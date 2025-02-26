// apiClient.ts

import axios from 'axios';
import { request } from '@/scripts/apiClient';

const JOBS_ENDPOINT = '/jobs/';

export interface Job {
  _id?: string;
  job_name: string;
  description: string;
  starting_price: number;
  expires_in: number;
  media?: string[];
  bids?: string[];
  timestamp?: string;
  tags: {
    category: string;
    location: string;
    tags: string[];
  };
}

export interface Bid {
  amount: number;
  message?: string;
}

export interface JobResponse {
  jobs: Job[];
  metadata: {
    totalCount: number;
    page: number;
    pageSize: number;
  };
}

export const JobsAPI = {
  // Create a new job
  createJob: async (job: Job) => {
    return await request(JOBS_ENDPOINT, {
      method: 'POST',
      body: job,
    });
  },

  // Retrieve all jobs (for bidders)
  getJobs: async (page = 1, pageSize = 10, filters: Record<string, string | string[]> = {}) => {
    console.log('start get jobs');
    const queryParams = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.append(key, value);
      }
    });


    const url = `${JOBS_ENDPOINT}?${queryParams.toString()}`;
    // console.log(`GET JOBS url ${url}`)
    return await request(url);
    
  },

  // Retrieve jobs posted by the current user
  getMyJobs: async (page = 1, pageSize = 10) => {
    return await request<JobResponse>(`${JOBS_ENDPOINT}/myjobs?page=${page}&pageSize=${pageSize}`);
  },

  // Retrieve expired jobs posted by the user
  getMyExpiredJobs: async (page = 1, pageSize = 10) => {
    return await request<JobResponse>(`${JOBS_ENDPOINT}/myexpiredjobs?page=${page}&pageSize=${pageSize}`);
  },

  // Update a job
  updateJob: async (jobId: string, updates: Partial<Job>) => {
    return await request(`${JOBS_ENDPOINT}/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete a job
  deleteJob: async (jobId: string) => {
    return await request(`${JOBS_ENDPOINT}/${jobId}`, {
      method: 'DELETE',
    });
  },

  // Add a bid to a job
  addBid: async (jobId: string, bid: Bid) => {
    return await request(`${JOBS_ENDPOINT}/${jobId}/addbid`, {
      method: 'POST',
      body: bid,
    });
  },
};