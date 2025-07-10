import { http } from "@/utils/http";
import { PagesType, Result } from "../../types";
import { SystemParkingSpace } from "./systemParkingSpace";

/**
 * 物联网-设备表
 */
export interface IotDevice {
  /**
   * ID
   */
  id: string;

  /**
   * 设备MAC地址
   */
  macAddress: string;

  /**
   * 设备名称
   */
  name: string;

  /**
   * 设备所在位置
   */
  location: string;

  /**
   * 设备作用
   */
  role: number;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 修改时间
   */
  updateTime: Date;

  /**
   * 组号
   */
  groupId: number;

  /**
   * 创建用户ID
   */
  createUserId: number;

  /**
   * 是否禁用，0|否；1|是
   */
  isDisabled: boolean;

  /**
   * 停车位信息
   */
  parkingSpaces?: SystemParkingSpace[];
}

/**
 * 车位状态模型
 */
export interface ParkingSpaceStatus {
  /**
   * 车位编号
   */
  id: string;

  /**
   * 车位楼层
   */
  fnum: string;

  /**
   * 车位状态
   */
  status: number;
}

/**
 * 查询IOT设备列表
 * @param data 查询条件
 * @returns 
 */
export const getIotDeviceList = (data: {
  ip?: string;
  location?: string;
  name?: string;
  macAddress?: string;
  role?: number | string;
  [property: string]: any;
}) => {
  return http.request<IotDevice[]>(
    "post",
    "/iot/getDeviceList",
    {
      data
    }
  );
};

/**
 * 新增或修改IOT设备，此方法不能修改关联的parkingSpace
 * @param data 数据，如需新增，请勿填写`data.id`字段
 * @returns 
 */
export const newOrUpdateIotDevice = (data: {
  id: string;
  macAddress: string;
  name: string;
  location: string;
  role: number;
  groupId: number;
  createUserId: number;
  isDisabled: number;
}) => {
  return http.request<Result<object>>(
    "post",
    "/iot/newOrUpdate",
    {
      data
    }
  );
};

/**
 * 删除IOT设备
 * @param data id列表
 * @returns 
 */
export const deleteIotDevice = (data: { ids: string[] }) => {
  return http.request<Result<object>>(
    "post",
    "/iot/delete",
    {
      data
    }
  );
};

/**
 * 获取车位状态
 * @param data 查询条件
 */
export const getParkingSpaceStatus = (data: {
  id?: string;
  modelName?: string;
}) => {
  return http.post<Result<ParkingSpaceStatus[]>, object>(
    "/iot/getParkingSpaceStatus",
    {
      data
    },
    { headers: { isEnableLoading: false } } // 关闭加载动画
  )
};