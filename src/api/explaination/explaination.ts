import { request } from '@/utils/http/axios';

export function getExplaination(params?: any) {
  return request({
    url: '/api/v1/manage/policy_interpretation/manage',
    method: 'get',
    params
  });
}

export function addExplaination(data: any) {
  return request({
    url: '/api/v1/manage/policy_interpretation/manage',
    method: 'post',
    data
  });
}

export function updateExplaination(uuid: string, data: any) {
  return request({
    url: '/api/v1/manage/policy_interpretation/manage/' + uuid,
    method: 'put',
    data
  });
}

export function deleteExplaination(uuid: string) {
  return request({
    url: '/api/v1/manage/policy_interpretation/manage/' + uuid,
    method: 'delete'
  });
}

export function getExplainationDetail(uuid: string) {
  return request({
    url: '/api/v1/manage/policy_interpretation/show',
    method: 'get',
    params: {
      uuid
    }
  });
}
