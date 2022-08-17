import { request } from '@/utils/http/axios';

export interface LoginParams {
  user: string;
  password: string;
}

export interface LoginUserInfo {
  /**
   * 用户头像，用户头像
   */
  avatar?: string;
  /**
   * 用户真实名称，用户真实名称
   */
  name: string;
  /**
   * 用户昵称，用户昵称
   */
  nick_name?: string;
  /**
   * 用户联系方式，用户联系方式
   */
  phone?: string;
  /**
   * 用户角色列表，用户角色列表
   */
  role: Role[];
  /**
   * Token
   */
  token: string;
  /**
   * Token到期时间
   */
  token_expire_time?: string;
  /**
   * 用户ID，用户ID
   */
  uuid: string;
}

/**
 * Role
 */
export interface Role {
  /**
   * 角色名称
   */
  name: string;
  /**
   * 角色权限
   */
  permissions: Permission[];
  /**
   * 角色UUID
   */
  uuid: string;
}

/**
 * 权限名称
 *
 * Permission
 */
export interface Permission {
  /**
   * 权限名称
   */
  name: string;
  /**
   * 权限路径
   */
  path: string;
  /**
   * 权限uuid
   */
  uuid: string;
}

export interface Role {
  /**
   * 角色名称
   */
  name: string;
  /**
   * 角色权限
   */
  permissions: Permission[];
  /**
   * 角色UUID
   */
  uuid: string;
}

export function login(params: LoginParams) {
  return request<LoginUserInfo>({
    url: '/api/v1/manage/user/login',
    method: 'post',
    data: params
  });
}
