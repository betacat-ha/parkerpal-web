export default {
  // 导航菜单
  menu: {
    home: '首页',
    business: '商户总览',
    couponIssuance: '停车领券',
    orderForm: '订单管理',
    outboundOrder: '订单流水',
    vehicle: '车场管理',
    carRentalSpace: '商家停车券管理',
    vipCar: '内部车辆',
    zombieCar: '访客车辆',
    journal: '车辆出入库记录',
    parkingSpaceManagement: '车位管理',
    parkingSpaceReservation: '车位预约管理',
    costManagement: '费用管理',
    feeRules: '收费规则',
    record: '月保记录',
    reconciliation: '商家对账',
    iotDevice: 'IOT设备',
    deviceManagement: '设备管理',
    indoorMap: '室内地图',
    system: '系统管理',
    setRole: '后台账号管理',
    customerManagement: '车主账号管理'
  },
  // 通用按钮
  button: {
    add: '添加',
    edit: '编辑',
    delete: '删除',
    save: '保存',
    cancel: '取消',
    search: '搜索',
    reset: '重置',
    submit: '提交',
    back: '返回',
    export: '导出',
    import: '导入',
    more: '更多',
    close: '关闭',
    confirm: '确认',
    detail: '详情'
  },
  // 通用标签
  label: {
    name: '名称',
    status: '状态',
    created: '创建时间',
    updated: '更新时间',
    operation: '操作',
    description: '描述',
    remarks: '备注',
    type: '类型',
    category: '分类'
  },
  // 消息提示
  message: {
    success: '操作成功',
    error: '操作失败',
    warning: '警告',
    info: '提示',
    confirmDelete: '确定要删除该项目吗？',
    deleteSuccess: '删除成功',
    saveSuccess: '保存成功',
    loadingError: '加载失败',
    networkError: '网络错误'
  },
  // 登录页面
  login: {
    title: '停车位管理系统',
    username: '用户名',
    password: '密码',
    login: '登录',
    register: '注册',
    forgetPassword: '忘记密码',
    rememberMe: '记住我'
  },
  // 车辆管理
  vehicle: {
    title: '车辆管理',
    licensePlate: '车牌号',
    vehicleType: '车辆类型',
    owner: '车主',
    phone: '电话',
    status: '状态',
    carType: {
      internal: '内部车辆',
      enterprise: '所属企业公车',
      externalMachinery: '外部车辆(机械车位)',
      externalNoMachinery: '外部车辆(非机械车位)'
    },
    grouping: {
      vip: '内部车辆',
      normal: '普通车辆'
    },
    fields: {
      mainlandLicensePlates: '内地车牌号码',
      otherLicensePlates: '其他车牌号码',
      createRange: '创建时间段'
    },
    placeholders: {
      mainlandLicensePlates: '请输入内地车牌号码',
      otherLicensePlates: '多个车牌号码英文逗号分隔',
      startTime: '开始时间',
      endTime: '结束时间'
    },
    rules: {
      mainlandLicensePlates: '请输入内地车牌号码',
      startTime: '请选择免收费时间段'
    },
    carRentalSpace: {
      title: '商家停车券管理',
      stats: {
        issued: '已发放停车券',
        disposable: '可发放停车券',
        parkingNumber: '总车位'
      },
      fields: {
        userName: '商家',
        assignedStatus: '额度状态',
        assignedNumber: '发放数量',
        timeRange: '免收费时间段'
      },
      placeholders: {
        userName: '请输入商家',
        assignedStatus: '请选择额度状态',
        assignedNumber: '请输入发放数量',
        startTime: '开始时间',
        endTime: '结束时间'
      },
      rules: {
        assignedNumber: '请输入发放数量',
        userName: '绑定商家',
        startTime: '请选择时间段',
        assignedStatus: '请选择状态'
      },
      selectUserTitle: '选择商家',
      userColumns: {
        account: '账号',
        userName: '单位名称',
        role: '角色',
        phone: '联系电话',
        status: '状态'
      },
      actions: {
        changeUser: '更改商家',
        bindUser: '绑定商家'
      },
      status: {
        valid: '有效',
        invalid: '失效'
      },
      userStatus: {
        normal: '正常',
        locked: '锁定',
        disabled: '禁用'
      }
    }
  },
  // 停车位管理
  parkingSpace: {
    title: '停车位管理',
    spaceNumber: '位置号',
    floor: '楼层',
    location: '位置',
    price: '价格',
    occupiedStatus: '占用状态',
    empty: '空闲',
    occupied: '占用'
  },
  // 设备相关
  device: {
    camera: { title: '摄像机管理' },
    turnstile: { title: '闸机管理' },
    fields: {
      deviceName: '设备名称',
      deviceLocation: '设备所在位置',
      deviceIp: '设备IP地址',
      devicePort: '设备IP端口',
      deviceRole: '设备作用',
      groupId: '设备组号',
      isToll: '是否在此处计费'
    },
    placeholders: {
      deviceName: '请输入设备名称',
      deviceLocation: '请输入设备所在位置',
      deviceIp: '请输入设备IP地址',
      devicePort: '请输入设备IP端口',
      deviceRole: '请选择设备作用',
      groupId: '请选择设备组号',
      isToll: '请选择是否在此处计费',
      startTime: '开始时间',
      endTime: '结束时间',
      rangeSeparator: '至'
    },
    actions: {
      delete: '删除',
      edit: '编辑',
      save: '保存',
      cancel: '取消'
    },
    effect: {
      in: '入闸',
      out: '出闸'
    },
    iotRole: {
      beacon: 'Beacon蓝牙基站',
      sensor: '车位传感器'
    },
    rules: {
      deviceName: '请输入设备名称',
      deviceLocation: '请输入设备所在位置',
      devicePassword: '请输入设备密码',
      deviceUserName: '请输入设备账号',
      deviceIp: '请输入设备IP地址',
      devicePort: '请输入设备IP端口',
      deviceRole: '请选择设备作用'
    }
  },
  // 首页
  home: {
    growCard: {
      inboundVehicle: '进库车辆',
      outboundVehicle: '出库车辆',
      monthlyFee: '月租收费',
      temporaryFee: '临停收费',
      day: '日',
      month: '月'
    },
    paymentStatistics: {
      income: '收益统计',
      expense: '支出统计',
      noData: '暂无数据',
      temporaryTodayIncome: '临保今日收益',
      temporaryTodayExpense: '临保今日支出',
      temporaryTotalIncome: '临保总收益',
      temporaryTotalExpense: '临保总支出',
      monthlyTodayIncome: '月保今日收益',
      monthlyTotalIncome: '月保总收益',
      viewTemporaryOrders: '点击查看临保订单流水',
      viewMonthlyOrders: '点击查看月保订单流水'
    },
    parkingLot: {
      title: '车位统计',
      noData: '暂无数据',
      labels: {
        remaining: '剩余车位',
        used: '已用车位',
        unissued: '未发券车位',
        issued: '已发券车位'
      }
    },
    trendChart: {
      title: '月收费统计',
      yearPlaceholder: '请选择年份',
      income: '收益',
      expense: '支出',
      discount: '优惠',
      totalAmount: '总金额',
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      noData: '暂无数据'
    }
  },
  // 出入库流水
  journal: {
    warehousing: {
      title: '车辆入库记录',
      mainlandLicensePlates: '内地车牌号码',
      mainlandLicensePlatesPlaceholder: '请输入内地车牌号码',
      warehousingTimeRange: '进库时间段',
      startTime: '开始时间',
      endTime: '结束时间',
      search: '搜索',
      serialNumber: '序号',
      licensePlate: '车牌号码/手机号码',
      vehicleGroupName: '车辆分组名称',
      deviceGroupNumber: '设备组号',
      isBilling: '此处是否开始计费',
      isOutOfWarehouse: '是否已出库',
      warehousingTime: '进库时间'
    },
    outbound: {
      title: '车辆出库记录',
      mainlandLicensePlates: '内地车牌号码',
      mainlandLicensePlatesPlaceholder: '请输入内地车牌号码',
      outboundTimeRange: '出库时间段',
      startTime: '开始时间',
      endTime: '结束时间',
      search: '搜索',
      serialNumber: '序号',
      licensePlate: '车牌号码/手机号码',
      vehicleGroupName: '车辆分组名称',
      deviceGroupNumber: '设备组号',
      outboundCameraIp: '出库摄像头IP',
      isBilling: '此处是否结算计费',
      warehousingTime: '进库时间',
      outboundTime: '出库时间',
      remark: '备注'
    },
    // 状态列表
    statusList: {
      notExited: '未出库',
      exited: '已出库'
    },
    billList: {
      startBilling: '开始计费',
      settlementBilling: '结算计费',
      noBilling: '不计费'
    },
    billOutList: {
      settlementBilling: '结算计费',
      noBilling: '不计费'
    }
  }
  ,
  // 停车相关统一键
  parking: {
    group: {
      f1: '负一层',
      f2: '负二层',
      ground: '地面'
    },
    status: {
      fixed: '固定车位',
      occupied: '占用车位',
      empty: '空闲车位'
    },
    reservation: {
      unreserved: '未预约',
      reserved: '已预约',
      cancelled: '已取消',
      expired: '已过期'
    },
    model: {
      default: '广师大停车场'
    },
    fields: {
      name: '车位名称',
      modelName: '车场',
      floor: '楼层',
      parkingSpaceId: '车位ID',
      deviceId: '设备ID',
      status: '车位状态',
      reservationRange: '预约时间段',
      licensePlate: '车牌号',
      reservationStatus: '预约状态',
      reservationStart: '预约开始时间',
      reservationEnd: '预约结束时间'
    },
    placeholders: {
      name: '请输入车位名称',
      modelName: '请选择车场',
      floor: '请选择楼层',
      parkingSpaceId: '请输入车位ID',
      deviceId: '请输入设备ID',
      startTime: '开始时间',
      endTime: '结束时间',
      status: '请选择车位状态',
      licensePlate: '请输入车牌号'
    },
    rules: {
      id: '请输入车位ID',
      name: '请输入车位名称',
      deviceId: '请输入设备ID',
      modelName: '请选择楼层名',
      parkingSpaceId: '请选择车位号',
      licensePlate: '请输入车牌号',
      licenseExample: '车牌号示例：粤A·12345',
      reservationUserId: '请选择预约用户',
      reservationStatus: '请选择预约状态',
      reservationStart: '请选择预约开始时间',
      reservationEnd: '请选择预约结束时间',
      status: '请选择车位状态'
    }
  },
  parkingRental: {
    title: '编辑车场配置',
    fields: {
      disposableNumber: '可发放停车券数',
      parkingNumber: '总车位'
    },
    placeholders: {
      disposableNumber: '请输入可发放停车券数',
      parkingNumber: '请输入总车位'
    },
    rules: {
      disposableNumber: '请输入发放停车券数量',
      parkingNumber: '请输入总车位'
    }
  }
  ,
  orderForm: {
    outboundOrder: {
      columns: {
        merchant: '商户名称',
        mainlandLicensePlates: '车牌号/手机号码(无牌车)',
        endTime: '出场时间',
        totalDuration: '停车时长',
        orderNumber: '订单编号',
        totalAmount: '总计金额',
        totalDiscountAmount: '优惠金额',
        discount: '优惠信息',
        totalIncomeAmount: '收入金额',
        typeName: '类型名称'
      }
    }
  },
  costManagement: {
    record: {
      monthlyStatus: {
        inWarranty: '在保',
        outWarranty: '过保'
      }
    }
  }
};
