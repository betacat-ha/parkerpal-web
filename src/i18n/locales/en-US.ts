export default {
  // Navigation Menu
  menu: {
    home: 'Home',
    business: 'Business Overview',
    couponIssuance: 'Coupon Issuance',
    orderForm: 'Order Management',
    outboundOrder: 'Order Flow',
    vehicle: 'Parking Management',
    carRentalSpace: 'Rental Space Management',
    vipCar: 'Internal Vehicles',
    zombieCar: 'Guest Vehicles',
    journal: 'Vehicle In/Out Records',
    parkingSpaceManagement: 'Space Management',
    parkingSpaceReservation: 'Reservation Management',
    costManagement: 'Cost Management',
    feeRules: 'Fee Rules',
    record: 'Monthly Pass Records',
    reconciliation: 'Merchant Reconciliation',
    iotDevice: 'IoT Devices',
    deviceManagement: 'Device Management',
    indoorMap: 'Indoor Map',
    system: 'System Management',
    setRole: 'Admin Account Management',
    customerManagement: 'Customer Account Management'
  },
  // Common Buttons
  button: {
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    reset: 'Reset',
    submit: 'Submit',
    back: 'Back',
    export: 'Export',
    import: 'Import',
    more: 'More',
    close: 'Close',
    confirm: 'Confirm',
    detail: 'Detail'
  },
  // Common Labels
  label: {
    name: 'Name',
    status: 'Status',
    created: 'Created',
    updated: 'Updated',
    operation: 'Operation',
    description: 'Description',
    remarks: 'Remarks',
    type: 'Type',
    category: 'Category'
  },
  // Messages
  message: {
    success: 'Operation successful',
    error: 'Operation failed',
    warning: 'Warning',
    info: 'Info',
    confirmDelete: 'Are you sure you want to delete this item?',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    loadingError: 'Failed to load',
    networkError: 'Network error'
  },
  // Login Page
  login: {
    title: 'Parking Management System',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    register: 'Register',
    forgetPassword: 'Forgot Password',
    rememberMe: 'Remember Me'
  },
  // Vehicle Management
  vehicle: {
    title: 'Vehicle Management',
    licensePlate: 'License Plate',
    vehicleType: 'Vehicle Type',
    owner: 'Owner',
    phone: 'Phone',
    status: 'Status',
    carType: {
      internal: 'Internal Vehicles',
      enterprise: 'Company Fleet Vehicles',
      externalMachinery: 'External Vehicles (Mechanical Spaces)',
      externalNoMachinery: 'External Vehicles (Non-mechanical Spaces)'
    },
    grouping: {
      vip: 'Internal Vehicles',
      normal: 'Regular Vehicles'
    },
    fields: {
      mainlandLicensePlates: 'Mainland License Plate',
      otherLicensePlates: 'Other License Plates',
      createRange: 'Created Time Range'
    },
    placeholders: {
      mainlandLicensePlates: 'Please enter mainland license plate',
      otherLicensePlates: 'Separate multiple license plates with English commas',
      startTime: 'Start Time',
      endTime: 'End Time'
    },
    rules: {
      mainlandLicensePlates: 'Please enter mainland license plate',
      startTime: 'Please select a free charging time range'
    },
    carRentalSpace: {
      title: 'Merchant Parking Coupon Management',
      stats: {
        issued: 'Issued Coupons',
        disposable: 'Available Coupons',
        parkingNumber: 'Total Spaces'
      },
      fields: {
        userName: 'Merchant',
        assignedStatus: 'Quota Status',
        assignedNumber: 'Allocation Amount',
        timeRange: 'Free Charging Time Range'
      },
      placeholders: {
        userName: 'Please enter merchant',
        assignedStatus: 'Please select quota status',
        assignedNumber: 'Please enter allocation amount',
        startTime: 'Start Time',
        endTime: 'End Time'
      },
      rules: {
        assignedNumber: 'Please enter allocation amount',
        userName: 'Bind merchant',
        startTime: 'Please select a time range',
        assignedStatus: 'Please select status'
      },
      selectUserTitle: 'Select Merchant',
      userColumns: {
        account: 'Account',
        userName: 'Company Name',
        role: 'Role',
        phone: 'Phone',
        status: 'Status'
      },
      actions: {
        changeUser: 'Change Merchant',
        bindUser: 'Bind Merchant'
      },
      status: {
        valid: 'Valid',
        invalid: 'Invalid'
      },
      userStatus: {
        normal: 'Normal',
        locked: 'Locked',
        disabled: 'Disabled'
      }
    }
  },
  // Parking Space Management
  parkingSpace: {
    title: 'Parking Space Management',
    spaceNumber: 'Space Number',
    floor: 'Floor',
    location: 'Location',
    price: 'Price',
    occupiedStatus: 'Occupied Status',
    empty: 'Empty',
    occupied: 'Occupied'
  },
  // Device related
  device: {
    camera: { title: 'Camera Management' },
    turnstile: { title: 'Turnstile Management' },
    fields: {
      deviceName: 'Device Name',
      deviceLocation: 'Device Location',
      deviceIp: 'Device IP',
      devicePort: 'Device Port',
      deviceRole: 'Device Role',
      groupId: 'Device Group',
      isToll: 'Is Billing'
    },
    placeholders: {
      deviceName: 'Please enter device name',
      deviceLocation: 'Please enter device location',
      deviceIp: 'Please enter device IP',
      devicePort: 'Please enter device port',
      deviceRole: 'Please select device role',
      groupId: 'Please select device group',
      isToll: 'Please select billing option',
      startTime: 'Start Time',
      endTime: 'End Time',
      rangeSeparator: 'To'
    },
    actions: {
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel'
    },
    effect: {
      in: 'In',
      out: 'Out'
    },
    iotRole: {
      beacon: 'Beacon Station',
      sensor: 'Parking Sensor'
    },
    rules: {
      deviceName: 'Please enter device name',
      deviceLocation: 'Please enter device location',
      devicePassword: 'Please enter device password',
      deviceUserName: 'Please enter device account',
      deviceIp: 'Please enter device IP',
      devicePort: 'Please enter device port',
      deviceRole: 'Please select device role'
    }
  },
  // Home
  home: {
    growCard: {
      inboundVehicle: 'Inbound Vehicles',
      outboundVehicle: 'Outbound Vehicles',
      monthlyFee: 'Monthly Rent',
      temporaryFee: 'Temporary Parking Fee',
      day: 'Day',
      month: 'Month'
    },
    paymentStatistics: {
      income: 'Income Statistics',
      expense: 'Expense Statistics',
      noData: 'No data',
      temporaryTodayIncome: 'Temporary parking today income',
      temporaryTodayExpense: 'Temporary parking today expense',
      temporaryTotalIncome: 'Temporary parking total income',
      temporaryTotalExpense: 'Temporary parking total expense',
      monthlyTodayIncome: 'Monthly parking today income',
      monthlyTotalIncome: 'Monthly parking total income',
      viewTemporaryOrders: 'View temporary order flow',
      viewMonthlyOrders: 'View monthly order flow'
    },
    parkingLot: {
      title: 'Parking Space Statistics',
      noData: 'No data',
      labels: {
        remaining: 'Remaining Spaces',
        used: 'Used Spaces',
        unissued: 'Unissued Coupon Spaces',
        issued: 'Issued Coupon Spaces'
      }
    },
    trendChart: {
      title: 'Monthly Fee Statistics',
      yearPlaceholder: 'Please select a year',
      income: 'Income',
      expense: 'Expense',
      discount: 'Discount',
      totalAmount: 'Total Amount',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      noData: 'No data'
    }
  },
  // Parking keys
  parking: {
    group: {
      f1: 'B1',
      f2: 'B2',
      ground: 'Ground'
    },
    status: {
      fixed: 'Fixed',
      occupied: 'Occupied',
      empty: 'Empty'
    },
    reservation: {
      unreserved: 'Unreserved',
      reserved: 'Reserved',
      cancelled: 'Cancelled',
      expired: 'Expired'
    },
    model: {
      default: 'MUST Parking'
    },
    fields: {
      name: 'Space Name',
      modelName: 'Parking Lot',
      floor: 'Floor',
      parkingSpaceId: 'Space ID',
      deviceId: 'Device ID',
      status: 'Space Status',
      reservationRange: 'Reservation Range',
      licensePlate: 'License Plate',
      reservationStatus: 'Reservation Status',
      reservationStart: 'Reservation Start Time',
      reservationEnd: 'Reservation End Time'
    },
    placeholders: {
      name: 'Please enter space name',
      modelName: 'Please select parking lot',
      floor: 'Please select floor',
      parkingSpaceId: 'Please enter space ID',
      deviceId: 'Please enter device ID',
      startTime: 'Start Time',
      endTime: 'End Time',
      status: 'Please select status',
      licensePlate: 'Please enter license plate'
    },
    rules: {
      id: 'Please enter space ID',
      name: 'Please enter space name',
      deviceId: 'Please enter device ID',
      modelName: 'Please select model name',
      parkingSpaceId: 'Please select space number',
      licensePlate: 'Please enter license plate',
      licenseExample: 'License example: 粤A·12345',
      reservationUserId: 'Please select user',
      reservationStatus: 'Please select reservation status',
      reservationStart: 'Please select reservation start time',
      reservationEnd: 'Please select reservation end time',
      status: 'Please select status'
    }
  },
  parkingRental: {
    title: 'Edit Parking Lot Settings',
    fields: {
      disposableNumber: 'Coupon Quota',
      parkingNumber: 'Total Spaces'
    },
    placeholders: {
      disposableNumber: 'Please enter coupon quota',
      parkingNumber: 'Please enter total spaces'
    },
    rules: {
      disposableNumber: 'Please enter coupon quota',
      parkingNumber: 'Please enter total spaces'
    }
  },
  orderForm: {
    outboundOrder: {
      columns: {
        merchant: 'Merchant',
        mainlandLicensePlates: 'License Plate / Phone (No Plate Vehicle)',
        endTime: 'Exit Time',
        totalDuration: 'Parking Duration',
        orderNumber: 'Order Number',
        totalAmount: 'Total Amount',
        totalDiscountAmount: 'Discount Amount',
        discount: 'Discount Info',
        totalIncomeAmount: 'Income Amount',
        typeName: 'Type Name'
      }
    }
  },
  costManagement: {
    record: {
      monthlyStatus: {
        inWarranty: 'In Warranty',
        outWarranty: 'Expired'
      }
    }
  },
  // Vehicle Entry/Exit Journal
  journal: {
    warehousing: {
      title: 'Vehicle Entry Records',
      mainlandLicensePlates: 'Mainland License Plate',
      mainlandLicensePlatesPlaceholder: 'Please enter mainland license plate',
      warehousingTimeRange: 'Entry Time Range',
      startTime: 'Start Time',
      endTime: 'End Time',
      search: 'Search',
      serialNumber: 'No.',
      licensePlate: 'License Plate / Phone',
      vehicleGroupName: 'Vehicle Group Name',
      deviceGroupNumber: 'Device Group Number',
      isBilling: 'Is Billing Started Here',
      isOutOfWarehouse: 'Is Exit Recorded',
      warehousingTime: 'Entry Time'
    },
    outbound: {
      title: 'Vehicle Exit Records',
      mainlandLicensePlates: 'Mainland License Plate',
      mainlandLicensePlatesPlaceholder: 'Please enter mainland license plate',
      outboundTimeRange: 'Exit Time Range',
      startTime: 'Start Time',
      endTime: 'End Time',
      search: 'Search',
      serialNumber: 'No.',
      licensePlate: 'License Plate / Phone',
      vehicleGroupName: 'Vehicle Group Name',
      deviceGroupNumber: 'Device Group Number',
      outboundCameraIp: 'Exit Camera IP',
      isBilling: 'Is Settlement Billing Here',
      warehousingTime: 'Entry Time',
      outboundTime: 'Exit Time',
      remark: 'Remark'
    },
    // Status list
    statusList: {
      notExited: 'Not Exited',
      exited: 'Exited'
    },
    billList: {
      startBilling: 'Start Billing',
      settlementBilling: 'Settlement Billing',
      noBilling: 'No Billing'
    },
    billOutList: {
      settlementBilling: 'Settlement Billing',
      noBilling: 'No Billing'
    }
  }
};
