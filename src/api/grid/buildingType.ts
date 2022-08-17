import { PaginateData } from '@/types/PaginateData';
import { request } from '@/utils/http/axios';

export interface BuildingType {
  no: number;
  type_name: string;
  memo: string;
}

export interface BuildingTypeResult extends BuildingType {
  uuid: string;
}

export interface BuildingTypeQueryParams {
  page?: number;
  size?: number;
  name?: string;
}

export function getBuildingType(params: BuildingTypeQueryParams) {
  return request<PaginateData<BuildingTypeResult>>({
    url: '/api/v1/buildingtype/',
    method: 'get',
    params
  });
}

export function createBuildingType(data: BuildingType) {
  return request<BuildingTypeResult>({
    url: '/api/v1/buildingtype/',
    method: 'post',
    data
  });
}

export function updateBuildingType(uuid: string, data: BuildingType) {
  return request<BuildingTypeResult>({
    url: `/api/v1/buildingtype/${uuid}/`,
    method: 'PATCH',
    data
  });
}

export function deleteBuildingType(uuid: string) {
  return request<void>({
    url: `/api/v1/buildingtype/${uuid}/`,
    method: 'DELETE'
  });
}
