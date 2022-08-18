import { request } from '@/utils/http/axios';

export function getPolicy(params: any) {
  return request({
    url: '/api/v1/manage/policy/manage',
    method: 'get',
    params
  });
}

export function addPolicy(params: any) {
  return request({
    url: '/api/v1/manage/policy/manage',
    method: 'post',
    data: params
  });
}

export function updatePolicy(uuid: string, data: any) {
  return request({
    url: '/api/v1/manage/policy/manage/' + uuid,
    method: 'put',
    data
  });
}

export function deletePolicy(uuid: string) {
  return request({
    url: '/api/v1/manage/policy/manage/' + uuid,
    method: 'delete'
  });
}

export function getPolicyDetail(uuid: string) {
  return request({
    url: '/api/v1/manage/policy/show',
    method: 'get',
    params: {
      uuid
    }
  });
}

export function getLabels() {
  return request({
    url: '/api/v1/dropdown/all_label',
    method: 'get'
  });
}
