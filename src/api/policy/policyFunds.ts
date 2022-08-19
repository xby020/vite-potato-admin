import { request } from '@/utils/http/axios';

export interface PolicyFundsQueryParams {
  page: number;
  page_size: number;
  name?: string;
  level?: number;
  relate_depart?: number;
  entp_scale?: string;
  declare_type?: number;
  type?: number;
}

export interface PolicyFunds {
  code: number;
  count: number;
  items: PolicyFundsItem[];
}

export interface PolicyFundsItem {
  depart: number;
  depart_map: {
    [key: string]: string;
  };
  uuid: string;
  amount: string;
  entp_scale: number;
  entp_scale_map: {
    [key: string]: string;
  };
  entp_name: string;
  policy_uuid: string;
  policy_name: string;
  label_uuid: string;
  label_name: string;
  pay_date: string;
}

export function getPolicyFunds(params: PolicyFundsQueryParams) {
  return request<PolicyFunds>({
    url: '/api/v1/manage/policy_payment/manage',
    method: 'get',
    params
  });
}

export function deletePolicyFunds(uuid: string) {
  return request<PolicyFunds>({
    url: '/api/v1/manage/policy_payment/manage/' + uuid,
    method: 'delete'
  });
}

export function addPolicyFunds(params: any) {
  return request<PolicyFunds>({
    url: '/api/v1/manage/policy_payment/manage',
    method: 'post',
    data: params
  });
}

export function editPolicyFunds(uuid: string, params: any) {
  return request<PolicyFunds>({
    url: '/api/v1/manage/policy_payment/manage/' + uuid,
    method: 'put',
    data: params
  });
}
