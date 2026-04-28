interface tableColumnType {
  prop: string;
  label: string;
  width?: string | number;
  handleFn?: (value: any) => string;
}

export const tollList = (t: (key: string) => string) => [
  {
    label: t("journal.billList.startBilling"),
    value: 1
  },
  {
    label: t("journal.billList.settlementBilling"),
    value: 2
  },
  {
    label: t("journal.billList.noBilling"),
    value: 0
  }
];
const tollOutList = (t: (key: string) => string) => [
  {
    label: t("journal.billOutList.settlementBilling"),
    value: 1
  },
  {
    label: t("journal.billOutList.noBilling"),
    value: 0
  }
];
export const effectList = (t: (key: string) => string) => [
  {
    label: t("device.effect.in"),
    value: 1
  },
  {
    label: t("device.effect.out"),
    value: 0
  }
];

export const iotRoleList = (t: (key: string) => string) => [
  {
    label: t("device.iotRole.beacon"),
    value: 1
  },
  {
    label: t("device.iotRole.sensor"),
    value: 0
  }
];
export const vehicleGrouping = (t: (key: string) => string) => [
  {
    label: t("vehicle.grouping.vip"),
    value: 2
  },
  {
    label: t("vehicle.grouping.normal"),
    value: 3
  }
];
export const typeCode = (t: (key: string) => string) => [
  {
    label: t("vehicle.type.temporary"),
    value: 1
  },
  {
    label: t("vehicle.type.monthly"),
    value: 2
  },
  {
    label: t("vehicle.type.visitor"),
    value: 3
  },
  {
    label: t("vehicle.type.noPlate"),
    value: 4
  },
  {
    label: t("vehicle.type.other"),
    value: 5
  }
];
export const statusList = (t: (key: string) => string) => [
  {
    label: t("journal.statusList.exited"),
    value: 1
  },
  {
    label: t("journal.statusList.notExited"),
    value: 0
  }
];
export const groupNumberList = (t: (key: string) => string) => [
  {
    label: t("parking.group.f1"),
    value: 1
  },
  {
    label: t("parking.group.f2"),
    value: 2
  },
  {
    label: t("parking.group.ground"),
    value: 3
  }
];
export const tableColumn = (t: (key: string) => string): tableColumnType[] => [
  {
    prop: "userName",
    label: t("orderForm.outboundOrder.columns.merchant")
  },
  {
    prop: "mainlandLicensePlates",
    label: t("orderForm.outboundOrder.columns.mainlandLicensePlates"),
    width: 220
  },
  {
    prop: "endTime",
    label: t("orderForm.outboundOrder.columns.endTime")
  },
  {
    prop: "totalDuration",
    label: t("orderForm.outboundOrder.columns.totalDuration")
  },
  {
    prop: "orderNumber",
    label: t("orderForm.outboundOrder.columns.orderNumber")
  },
  {
    prop: "totalAmount",
    label: t("orderForm.outboundOrder.columns.totalAmount")
  },
  {
    prop: "totalDiscountAmount",
    label: t("orderForm.outboundOrder.columns.totalDiscountAmount")
  },
  {
    prop: "discount",
    label: t("orderForm.outboundOrder.columns.discount")
  },
  {
    prop: "totalIncomeAmount",
    label: t("orderForm.outboundOrder.columns.totalIncomeAmount")
  },
  {
    prop: "typeName",
    label: t("orderForm.outboundOrder.columns.typeName")
  }
];

export const warehousingTableColumn = (t: (key: string) => string): tableColumnType[] => {
  return [
    {
      prop: "mainlandLicensePlates",
      label: t("journal.warehousing.licensePlate")
    },
    {
      prop: "carGroupName",
      label: t("journal.warehousing.vehicleGroupName")
    },
    {
      prop: "deviceGroupName",
      label: t("journal.warehousing.deviceGroupNumber")
    },
    {
      prop: "isToll",
      label: t("journal.warehousing.isBilling"),
      handleFn: value => {
        const tollList = [
          { label: t("journal.billList.startBilling"), value: 1 },
          { label: t("journal.billList.settlementBilling"), value: 2 },
          { label: t("journal.billList.noBilling"), value: 0 }
        ];
        return tollList.find(item => item.value == value)?.label ?? "--";
      }
    },
    {
      prop: "status",
      label: t("journal.warehousing.isOutOfWarehouse"),
      handleFn: value => {
        const statusListLocal = [
          { label: t("journal.statusList.exited"), value: 1 },
          { label: t("journal.statusList.notExited"), value: 0 }
        ];
        return statusListLocal.find(item => item.value == value)?.label ?? "--";
      }
    },
    {
      prop: "startTime",
      label: t("journal.warehousing.warehousingTime")
    }
  ];
};
export const outboundColumn = (t: (key: string) => string): tableColumnType[] => {
  return [
    {
      prop: "mainlandLicensePlates",
      label: t("journal.outbound.licensePlate")
    },
    {
      prop: "carGroupName",
      label: t("journal.outbound.vehicleGroupName")
    },
    {
      prop: "deviceGroupName",
      label: t("journal.outbound.deviceGroupNumber")
    },
    {
      prop: "endCameraDeviceIp",
      label: t("journal.outbound.outboundCameraIp")
    },
    {
      prop: "isToll",
      label: t("journal.outbound.isBilling"),
      handleFn: value => {
        const tollOutListLocal = [
          { label: t("journal.billOutList.settlementBilling"), value: 1 },
          { label: t("journal.billOutList.noBilling"), value: 0 }
        ];
        return tollOutListLocal.find(item => item.value == value)?.label ?? "--";
      }
    },
    {
      prop: "startTime",
      label: t("journal.outbound.warehousingTime")
    },
    {
      prop: "endTime",
      label: t("journal.outbound.outboundTime")
    },
    {
      prop: "remark",
      label: t("journal.outbound.remark"),
      width: 100
    }
  ];
};

export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  type: string;
  action: string;
}

export const growCardList = (t: (key: string) => string): GrowCardItem[] => [
  {
    title: t("home.growCard.inboundVehicle"),
    icon: "total-sales|svg",
    value: 20000,
    total: 500000,
    type: "success",
    action: t("home.growCard.day")
  },
  {
    title: t("home.growCard.outboundVehicle"),
    icon: "download-count|svg",
    value: 8000,
    total: 120000,
    type: "primary",
    action: t("home.growCard.day")
  },
  {
    title: t("home.growCard.monthlyFee"),
    icon: "visit-count|svg",
    value: 2000,
    total: 120000,
    type: "danger",
    action: t("home.growCard.month")
  },
  {
    title: t("home.growCard.temporaryFee"),
    icon: "transaction|svg",
    value: 5000,
    total: 50000,
    type: "danger",
    action: t("home.growCard.month")
  }
];
export const carTypeList = (t: (key: string) => string) => [
  {
    value: "1",
    label: t("vehicle.carType.internal"),
    charge: 0,
    key: "monthlyInternalCar"
  },
  {
    value: "2",
    label: t("vehicle.carType.enterprise"),
    charge: 0,
    key: "monthlyEnterpriseCar"
  },
  {
    value: "3",
    label: t("vehicle.carType.externalMachinery"),
    charge: 0,
    key: "monthlyExternalCarMachinery"
  },
  {
    value: "4",
    label: t("vehicle.carType.externalNoMachinery"),
    charge: 0,
    key: "monthlyInternalCarNoMachinery"
  }
];
export const monthlyStatusList = (t: (key: string) => string) => [
  {
    value: "1",
    label: t("costManagement.record.monthlyStatus.valid")
  },
  {
    value: "2",
    label: t("costManagement.record.monthlyStatus.expired")
  }
];

export const parkingSpaceStatusList = (t: (key: string) => string) => [
  {
    value: "0",
    label: t("parking.status.fixed")
  },
  {
    value: "1",
    label: t("parking.status.occupied")
  },
  {
    value: "2",
    label: t("parking.status.empty")
  }
];

export const parkingSpaceStatusColor = ["#7eacca", "#ff0000", "#00ff00"];

/**
 * 车位预约状态
 */
export const parkingSpaceReservationStatus = (t: (key: string) => string) => [
  {
    value: "0",
    label: t("parking.reservation.unreserved")
  },
  {
    value: "1",
    label: t("parking.reservation.reserved")
  },
  {
    value: "2",
    label: t("parking.reservation.cancelled")
  },
  {
    value: "3",
    label: t("parking.reservation.expired")
  }
];

export const parkingSpaceFNumList = (t: (key: string) => string) => [
  {
    value: "2",
    label: t("parking.group.f1")
  },
  {
    value: "1",
    label: t("parking.group.f2")
  }
];

export const parkingSpaceModelNameList = (t: (key: string) => string) => [
  {
    value: "10005",
    label: t("parking.model.default")
  }
]