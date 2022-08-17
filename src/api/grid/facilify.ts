import { PaginateData } from '@/types/PaginateData';
import { request } from '@/utils/http/axios';

export interface FacilityTypeResult {
  uuid: string;
  name: string;
  no: number;
}

export interface FacilityTypeResults extends PaginateData<FacilityTypeResult> {}

export interface FacilityResult {
  /**
   * 简介
   */
  brief: string;
  data?: any;
  /**
   * 网格uuid
   */
  grid: string;
  /**
   * 网格名称
   */
  grid_name: string;
  /**
   * 设备(摄像头)编码
   */
  index_code: string;
  /**
   * 安装位置
   */
  installation: string;
  /**
   * 物品名称
   */
  item_name: string;
  /**
   * 部件类型uuid
   */
  item_type: string;
  /**
   * 部件类型名称
   */
  item_type_name: string;
  /**
   * 纬度
   */
  latitude: string;
  /**
   * 经度
   */
  longitude: string;
  /**
   * 编号
   */
  no: string;
  /**
   * 照片
   */
  photo: string;
  /**
   * 在线状态
   */
  status: string;
  uuid: string;
}

export interface FacilityResults extends PaginateData<FacilityResult> {}

export interface FacilityQueryParams {
  page?: number;
  size?: number;
  item_type?: string;
  name?: string;
  grid?: string;
}

export interface FacilityCreateParams {
  no: string;
  item_name: string;
  grid: string;
}

/**
 * 获取设备类型列表
 * @returns {Promise<FacilityTypeResults>}
 */
export function getFacilityType() {
  return request<FacilityTypeResults>({
    url: '/api/v1/facilitytype',
    method: 'get'
  });
}

/**
 * 获取设备分页列表
 * @param params 查询参数
 * @returns {FacilityResults} 设备分页列表
 */
export function getFacility(params: FacilityQueryParams) {
  return request<FacilityResults>({
    url: '/api/v1/facility/',
    method: 'get',
    params
  });
}

/**
 * 更新设备信息
 * @param params 更新后的设备字段信息
 * @returns 更新后的设备信息
 */
export function updateFacility(params: FacilityResult) {
  return request<FacilityResult>({
    url: '/api/v1/facility/',
    method: 'patch',
    data: params
  });
}

/**
 * 创建设备
 * @param params 新增设备信息
 * @returns 设备信息
 */
export function createFacility(params: FacilityResult) {
  return request<FacilityResult>({
    url: '/api/v1/facility/',
    method: 'post',
    data: params
  });
}

/**
 * 删除设备
 * @param uuid 设备uuid
 * @returns {void}
 */
export function deleteFacility(uuid: string) {
  return request<void>({
    url: '/api/v1/facility/',
    method: 'delete',
    params: {
      uuid
    }
  });
}
