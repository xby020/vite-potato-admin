import { PaginateData } from '@/types/PaginateData';
import { request } from '@/utils/http/axios';

export interface VillageResult {
  uuid: string;
  name: string;
  data: any;
  property: string;
}

export interface VillageQueryParams {
  page?: number;
  size?: number;
  village?: string;
  property?: string;
}

export interface VillageQueryResults extends PaginateData<VillageResult> {}

export function getVillages(params: VillageQueryParams) {
  return request<VillageQueryResults>({
    url: '/api/v1/village/list',
    method: 'get',
    params
  });
}

export function updateVillage(params: VillageResult) {
  return request<VillageResult>({
    url: '/api/v1/village',
    method: 'post',
    data: params
  });
}

export function getVillageInfo(uuid: string) {
  return request<VillageResult>({
    url: '/api/v1/village/info',
    method: 'get',
    params: {
      uuid
    }
  });
}

export function createVillage(params: {
  name: string;
  data: any;
  property: string;
}) {
  return request<VillageResult>({
    url: '/api/v1/village/',
    method: 'post',
    data: params
  });
}

export function deleteVillage(uuid: string) {
  return request<VillageResult>({
    url: '/api/v1/village/',
    method: 'delete',
    params: {
      uuid
    }
  });
}
