import { http } from "@/utils/http";
import { PagesType, Result } from "../../types";

export interface SystemParkingSpaceReservationRecord {
  id: number,
  parkingSpaceId: string,
  reservationStart: Date,
  reservationEnd: Date,
  reservationStatus: string,
  reservationUserId: string,
  createdAt: Date,
  updatedAt: Date,
  parkingSpace: SystemParkingSpace,
  [property: string]: any;
}

export interface SystemParkingSpace {
  /**
   * 备注
   */
  comment?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 所属的设备ID，0为未设置
   */
  deviceId?: string;
  /**
   * 激光传感器距离
   */
  distance?: number;
  /**
   * 3D室内地图楼层编码
   */
  fnum?: string;
  /**
   * ID
   */
  id?: string;
  /**
   * 是否被占用
   */
  isOccupied?: boolean;
  /**
   * 是否预留车位，0|否；1|是
   */
  isReserved?: boolean;
  /**
   * 3D室内地图模型名称
   */
  modelName?: string;
  /**
   * 车位名称
   */
  name?: string;
  /**
   * 车位父ID
   */
  parentId?: number;
  /**
   * 传感器槽位
   */
  sensorSlot?: string;
  /**
   * 车位状态，0|空闲；1|已分配；2|已占用
   */
  status?: number;
  /**
   * 车位类型
   */
  type?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [property: string]: any;
}

export interface newOrUpdateSpaceReservationRecordRequest {
  createdAt?: string;
  id?: number;
  parkingSpace?: SystemParkingSpace;
  parkingSpaceId?: string;
  reservationEnd?: string;
  reservationStart?: string;
  reservationStatus?: string;
  reservationUserId?: string;
  updatedAt?: string;
  [property: string]: any;
}


/**
 * 
 * @param data 
 * @returns
 */
export const newOrUpdateSpaceReservationRecord = (data: newOrUpdateSpaceReservationRecordRequest) => {
  return http.post<Result<SystemParkingSpace>, object>(
    "/systemManagement/reserveParking",
    {
      data
    }
  )
}


export const getSpaceReservationRecordList = (data: {
  createdAt?: string;
  id?: number;
  licensePlate?: string;
  pageNumber?: number;
  pageSize?: number;
  parkingSpaceId?: string;
  parkingSpaceName?: string;
  reservationEnd?: string;
  reservationStart?: string;
  reservationStatus?: string;
  reservationUserId?: string;
  updatedAt?: string;
  [property: string]: any;
}) => {
  return http.post<PagesType<SystemParkingSpaceReservationRecord>, object>(
    "/systemManagement/pageReservation",
    {
      data
    }
  );
};

/**
 * 分页查询车位信息
 */
export const pageParkingSpaceList = (data: {
  pageNumber?: number;
  pageSize?: number;
  id?: string;
  name?: string;
  fnum?: string;
  status?: number;
  isOccupied?: boolean;
  isReserved?: boolean;
  deviceId?: string;
  type?: string;
  [property: string]: any;
}) => {
  return http.post<PagesType<SystemParkingSpace>, object>(
    "/systemManagement/pageParkingSpaceList",
    {
      data
    }
  );
}

/**
 * 新增或修改车位信息
 * @param data 
 * @returns 
 */
export const newOrUpdateParkingSpace = (data: {
  id?: string;
  name: string;
  fnum: string;
  status?: number;
  isOccupied?: boolean;
  isReserved?: boolean;
  deviceId?: string;
  type?: string;
  comment?: string;
  distance?: number;
  sensorSlot?: string;
  modelName?: string;
  parentId?: string;
  [property: string]: any;
}) => {
  return http.post<Result<SystemParkingSpace>, object>(
    "/systemManagement/createOrUpdateParkingSpace",
    {
      data
    }
  );
}

/**
 * 删除车位信息
 * @param data 
 * @returns 
 */
export const deleteParkingSpace = (data: {
  id: string;
  [property: string]: any;
}) => {
  return http.post<Result<SystemParkingSpace>, object>(
    "/systemManagement/deleteParkingSpace",
    {
      data
    }
  );
}