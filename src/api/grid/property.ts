import { PaginateData } from '@/types/PaginateData';
import { request } from '@/utils/http/axios';

export interface QueryPropertyParams {
  page?: number;
  size?: number;
  name?: string;
  owner_name?: string;
}

export interface Property {
  /**
   * 简介
   */
  brief: string;
  /**
   * 企业证件号码
   */
  ent_id: string;
  /**
   * 公司名称
   */
  name: string;
  /**
   * 办公地址
   */
  office_address: string;
  /**
   * 负责人身份证号
   */
  owner_id: string;
  /**
   * 负责人姓名
   */
  owner_name: string;
  /**
   * 电话
   */
  phone: string;
  /**
   * 照片
   */
  photo: string;
  uuid: string;
}

export function getProperty(params: QueryPropertyParams) {
  return request<PaginateData<Property>>({
    url: '/api/v1/property',
    method: 'get',
    params
  });
}

export function getPropertyInfo(uuid: string) {
  return request<Property>({
    url: `/api/v1/property/${uuid}/`,
    method: 'get'
  });
}

export function createProperty(data: Property) {
  return request<Property>({
    url: '/api/v1/property/',
    method: 'post',
    data
  });
}

export function deleteProperty(uuid: string) {
  return request<void>({
    url: '/api/v1/property/' + uuid,
    method: 'delete'
  });
}

export function updateProperty(uuid: string, data: Property) {
  return request<Property>({
    url: '/api/v1/property/' + uuid + '/',
    method: 'PATCH',
    data
  });
}
