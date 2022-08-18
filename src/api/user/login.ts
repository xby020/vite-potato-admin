import { request } from '@/utils/http/axios';

export interface LoginParams {
  user: string;
  password: string;
}

export interface LoginUserInfo {
  /**
   * 注册事件
   */
  add_datetime: string;
  /**
   * 头像
   */
  img: string;
  /**
   * 最后一次登录时间
   */
  last_time: string;
  /**
   * 手机
   */
  mobile: string;
  /**
   * 角色
   */
  role: number;
  /**
   * 角色字典
   */
  role_map: { [key: string]: any };
  /**
   * token
   */
  token: string;
  /**
   * 用户名称
   */
  username: string;
  /**
   * 用户UUID
   */
  uuid: string;
}

export function login(params: LoginParams) {
  return request<any>({
    url: '/api/v1/manage/user/login',
    method: 'post',
    data: params
  });
}
