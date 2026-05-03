export default {
  // Navigation Menu
  menu: {
    home: 'Home',
    business: 'Business Overview',
    couponIssuance: 'Coupon Issuance',
    orderForm: 'Order Management',
    outboundOrder: 'Order Flow',
    vehicle: 'Parking Management',
    carRentalSpace: 'Coupon Management',
    vipCar: 'Internal Vehicles',
    visitorCar: 'Guest Vehicles',
    journal: 'Vehicle Records',
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
    changePassword: 'Change Password',
    logout: 'Log Out',
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
  // Tag Context Menu
  tag: {
    reload: 'Reload',
    closeCurrent: 'Close Current Tab',
    closeLeft: 'Close Tabs to the Left',
    closeRight: 'Close Tabs to the Right',
    closeOther: 'Close Other Tabs',
    closeAll: 'Close All Tabs',
    contentFullScreen: 'Full Screen Content Area',
    exitContentFullScreen: 'Exit Full Screen'
  },
  // Common Labels
  label: {
    name: 'Name',
    serialNumber: 'No.',
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
    usernameRequired: 'Please enter username',
    passwordRequired: 'Please enter password',
    success: 'Login successful',
    register: 'Register',
    forgetPassword: 'Forgot Password',
    rememberMe: 'Remember Me'
  },
  passwordModal: {
    title: 'Change Password',
    fields: {
      oldPassword: 'Old Password',
      password: 'New Password',
      confirmPassword: 'Confirm New Password'
    },
    placeholders: {
      oldPassword: 'Please enter your old password',
      password: 'Please enter your new password',
      confirmPassword: 'Please confirm your new password'
    },
    rules: {
      oldPasswordRequired: 'Please enter your old password',
      passwordRequired: 'Please enter your new password',
      confirmPasswordRequired: 'Please confirm your new password',
      passwordMismatch: 'The two passwords do not match!'
    },
    success: 'Updated successfully'
  },
  couponIssuance: {
    desktop: {
      title: 'Parking Coupon Issuance - Desktop',
      subtitle: 'Desktop Coupon Issuance',
      qrTitle: 'Exit QR Code',
      qrAlt: 'Exit QR Code',
      qrNotice: 'Dynamic code, can only be used once and is valid for 30 minutes.'
    },
    placeholders: {
      plates: 'Please enter your license plate number / phone number (no plate vehicle)'
    },
    labels: {
      merchantCoupon: 'Merchant Coupon',
      remainingCoupon: 'Remaining Coupon'
    },
    units: {
      sheet: ' coupons'
    },
    buttons: {
      receive: 'Issue Coupon',
      refreshQr: 'Refresh QR Code'
    },
    messages: {
      noCouponLeft: ': No more coupons are available. Please contact the property manager.',
      getCouponSuccess: ': Coupon requested successfully'
    },
    qrExpiry: {
      label: 'QR Code Expiry Time: ',
      remainingMinutes: 'Expires in {minutes} minute(s)',
      expired: 'QR code has expired. Please click the refresh button to generate a new one'
    },
    rules: {
      platesRequired: 'Please enter the license plate number / phone number (no plate vehicle)',
      platesPattern: 'Please enter a valid license plate number or phone number'
    },
    dialog: {
      title: 'Coupon Details',
      parkingLot: 'Parking Lot',
      licensePlate: 'License Plate',
      startTime: 'Entry Time',
      endTime: 'Exit Time',
      totalDuration: 'Parking Duration',
      totalAmount: 'Total Amount',
      discountAmount: 'Discount Amount',
      discountInfo: 'Discount Info',
      payableAmount: 'Amount Due',
      success: 'Coupon received successfully',
      noticePrefix: 'Please leave within',
      noticeHighlight: '30 minutes',
      noticeSuffix: 'after receiving the coupon, otherwise parking fees must be paid.'
    }
  },
  // Other Pages
  remaining: {
    loading: 'Loading...'
  },
  error: {
    title: 'Error Pages',
    '403': '403',
    '404': '404',
    '500': '500'
  },
  // App Title
  app: {
    title: 'ParkerPal SPMS'
  },
  // Vehicle Management
  vehicle: {
    title: 'Vehicle Management',
    licensePlate: 'License Plate',
    vehicleType: 'Vehicle Type',
    owner: 'Owner',
    phone: 'Phone',
    status: 'Status',
    type: {
      temporary: 'Temporary Vehicles',
      monthly: 'Monthly Parking Vehicles',
      visitor: 'Visitor Vehicles',
      noPlate: 'No Plate Vehicles',
      other: 'Other Vehicles'
    },
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
      startTime: 'Please select a time range'
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
        timeRange: 'Time Range'
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
    },
    visitor: {
      fields: {
        isFree: 'Invalid Status',
        timeRange: 'Time Range'
      },
      placeholders: {
        isFree: 'Please select invalid status'
      },
      status: {
        valid: 'Valid',
        invalid: 'Invalid'
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
    },
    management: {
      title: 'IOT Device Management',
      fields: {
        name: 'Device Name',
        location: 'Device Location',
        macAddress: 'Device MAC Address',
        role: 'Device Type',
        groupId: 'Device Group',
        createRange: 'Created Time Range'
      },
      placeholders: {
        name: 'Please enter device name',
        location: 'Please enter device location',
        macAddress: 'Please enter device MAC address',
        role: 'Please select device type',
        groupId: 'Please select device group'
      },
      rules: {
        id: 'Please enter device ID',
        macAddress: 'Please enter MAC address',
        macAddressPattern: 'MAC address format is incorrect',
        name: 'Please enter device name',
        location: 'Please enter device location',
        role: 'Please select device role',
        groupId: 'Please select device group',
        createUserId: 'Please select the creating user'
      },
      messages: {
        cannotAddWhileEditing: 'Cannot add while editing!'
      }
    }
  },
  // System Management
  system: {
    setRole: {
      title: 'Account Management',
      fields: {
        account: 'Login Account',
        userName: 'Company Name',
        phoneNumber: 'Phone Number',
        roleId: 'Role',
        status: 'Status',
        freeTime: 'Free Parking Duration (Minutes)',
        frontBusinessLicense: 'Business License',
        headSculpture: 'Company Logo'
      },
      placeholders: {
        account: 'Please enter login account',
        userName: 'Please enter company name',
        phoneNumber: 'Please enter phone number',
        roleId: 'Please select role',
        status: 'Please select status',
        freeTime: 'Please enter free parking duration'
      },
      columns: {
        account: 'Account',
        userName: 'Company Name',
        role: 'Role',
        phoneNumber: 'Phone Number',
        freeTime: 'Free Parking Duration (Minutes)'
      },
      actions: {
        resetPassword: 'Reset Password',
        known: 'Got it'
      },
      dialog: {
        addTitle: 'Add Account',
        editTitle: 'Edit Account'
      },
      status: {
        normal: 'Normal',
        locked: 'Locked',
        disabled: 'Disabled'
      },
      rules: {
        account: 'Please enter account',
        userName: 'Please enter company name',
        roleId: 'Please select role',
        status: 'Please select status',
        phoneNumber: 'Please enter phone number',
        phoneNumberPattern: 'Invalid phone number format',
        freeTime: 'Please enter free parking duration',
        frontBusinessLicense: 'Please upload business license',
        unitAddress: 'Please enter unit address',
        headSculpture: 'Please upload company logo'
      },
      messages: {
        createSuccess: 'Account created successfully',
        resetSuccess: 'Password reset successfully',
        defaultPassword: 'The default password for new accounts is 123456'
      }
    },
    customerManagement: {
      title: 'Customer Account Management',
      fields: {
        account: 'Login Account',
        userName: 'License Plate',
        phoneNumber: 'Phone Number',
        roleId: 'Role',
        status: 'Status',
        freeTime: 'Free Parking Duration (Minutes)',
        frontBusinessLicense: 'Business License',
        headSculpture: 'Company Logo'
      },
      placeholders: {
        account: 'Please enter login account',
        userName: 'Please enter license plate',
        phoneNumber: 'Please enter phone number',
        roleId: 'Please select role',
        status: 'Please select status',
        freeTime: 'Please enter free parking duration'
      },
      columns: {
        account: 'Account',
        userName: 'License Plate',
        phoneNumber: 'Phone Number',
        freeTime: 'Free Parking Duration (Minutes)'
      },
      actions: {
        resetPassword: 'Reset Password',
        known: 'Got it'
      },
      dialog: {
        addTitle: 'Add Account',
        editTitle: 'Edit Account'
      },
      status: {
        normal: 'Normal',
        locked: 'Locked',
        disabled: 'Disabled'
      },
      rules: {
        account: 'Please enter account',
        userName: 'Please enter license plate',
        roleId: 'Please select role',
        status: 'Please select status',
        phoneNumber: 'Please enter phone number',
        phoneNumberPattern: 'Invalid phone number format',
        freeTime: 'Please enter free parking duration',
        frontBusinessLicense: 'Please upload business license',
        unitAddress: 'Please enter unit address',
        headSculpture: 'Please upload company logo'
      },
      messages: {
        createSuccess: 'Account created successfully',
        resetSuccess: 'Password reset successfully',
        defaultPassword: 'The default password for new accounts is 123456'
      }
    },
    wxManage: {
      title: 'WeChat Pay Configuration',
      fields: {
        appId: 'WeChat Official Account AppID',
        currency: 'Currency',
        apiV3Key: 'Merchant APIv3 Key',
        macId: 'Merchant ID',
        macSerialNo: 'Merchant API Certificate Serial Number',
        secret: 'Official Account Secret',
        privateKeyPath: 'Merchant Private Key Upload'
      },
      placeholders: {
        appId: 'Please enter WeChat official account AppID',
        currency: 'Please enter currency',
        apiV3Key: 'Please enter merchant APIv3 key',
        macId: 'Please enter merchant ID',
        macSerialNo: 'Please enter merchant API certificate serial number',
        secret: 'Please enter official account secret'
      },
      rules: {
        appId: 'WeChat official account AppID',
        currency: 'Please enter currency',
        apiV3Key: 'Please enter merchant APIv3 key',
        macId: 'Please enter merchant ID',
        macSerialNo: 'Please enter merchant API certificate serial number',
        secret: 'Please enter official account secret',
        privateKeyPath: 'Please upload merchant private key file'
      },
      actions: {
        upload: 'Click to Upload'
      },
      messages: {
        uploadFailed: 'Upload failed!',
        uploadSuccess: 'Upload successful!',
        loading: 'Loading'
      }
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
      title: 'Outbound Order Flow',
      fields: {
        mainlandLicensePlates: 'License Plate / Phone Number (No Plate Vehicle)',
        orderNumber: 'Order Number',
        userName: 'Merchant',
        typeCode: 'Parking Type',
        startTime: 'Entry Time',
        endTime: 'Exit Time',
        totalAmount: 'Total Amount',
        totalDiscountAmount: 'Discount Amount',
        totalIncomeAmount: 'Income Amount',
        totalDuration: 'Parking Duration'
      },
      placeholders: {
        mainlandLicensePlates: 'Please enter license plate / phone number (no plate vehicle)',
        orderNumber: 'Please enter order number',
        userName: 'Please enter merchant',
        typeCode: 'Please select parking type',
        startTime: 'Please select entry time',
        endTime: 'Please select exit time',
        totalAmount: 'Please enter total amount',
        totalDiscountAmount: 'Please enter discount amount',
        totalIncomeAmount: 'Please enter income amount',
        totalDuration: 'Please enter parking duration'
      },
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
    feeRules: {
      title: 'Fee Rules Settings',
      monthlyFeeTitle: 'Monthly Parking Fee',
      fields: {
        freeDuration: 'Free Entry Duration',
        tollStandard: 'Temporary Parking Fee',
        feeCap: 'Daily Temporary Parking Cap',
        monthlyInternalCar: 'Internal Vehicle Fee',
        monthlyEnterpriseCar: 'Company Fleet Vehicle Fee',
        monthlyExternalCarMachinery: 'External Vehicle Fee (Mechanical Space)',
        monthlyInternalCarNoMachinery: 'External Vehicle Fee (Non-mechanical Space)'
      },
      placeholders: {
        freeDuration: 'Please enter free entry duration',
        tollStandard: 'Please enter temporary parking fee',
        feeCap: 'Please enter daily temporary parking cap',
        monthlyInternalCar: 'Please enter internal vehicle fee',
        monthlyEnterpriseCar: 'Please enter company fleet vehicle fee',
        monthlyExternalCarMachinery: 'Please enter external vehicle fee (mechanical space)',
        monthlyInternalCarNoMachinery: 'Please enter external vehicle fee (non-mechanical space)'
      },
      units: {
        minute: 'Minutes',
        hour: 'CNY/Hour',
        day: 'Days',
        month: 'CNY/Month'
      },
      rules: {
        freeDuration: 'Please enter free entry duration',
        tollStandard: 'Please enter temporary parking fee',
        monthlyInternalCar: 'Please enter internal vehicle fee',
        monthlyEnterpriseCar: 'Please enter company fleet vehicle fee',
        monthlyExternalCarMachinery: 'Please enter external vehicle fee (mechanical space)',
        feeCap: 'Please enter daily temporary parking cap',
        monthlyInternalCarNoMachinery: 'Please enter external vehicle fee (non-mechanical space)'
      }
    },
    record: {
      fields: {
        mainlandLicensePlates: 'License Plate',
        monthlyFree: 'Monthly Fee',
        parkingLotCode: 'Space Code',
        userName: 'Name',
        phoneNumber: 'Phone Number',
        cardId: 'ID Number',
        monthlyTimeRange: 'Monthly Parking Period',
        charge: 'Charge',
        assignedNumber: 'Rental Spaces',
        totalDuration: 'Total Parking Duration (Hours)',
        totalAmount: 'Total Amount (CNY)',
        totalDiscountAmount: 'Total Discount Amount (CNY)',
        totalIncomeAmount: 'Total Income Amount (CNY)',
        orderTime: 'Order Time',
        status: 'Publish Status'
      },
      placeholders: {
        mainlandLicensePlates: 'Please enter license plate',
        monthlyFree: 'Please enter monthly fee',
        parkingLotCode: 'Please enter space code',
        userName: 'Please enter name',
        phoneNumber: 'Please enter phone number',
        cardId: 'Please enter ID number',
        carTypeCode: 'Please select vehicle type',
        monthlyStatus: 'Please select status',
        startMonth: 'Please select start month',
        endMonth: 'Please select end month'
      },
      labels: {
        longTerm: 'Long Term'
      },
      rules: {
        carTypeCode: 'Please select vehicle type',
        monthlyStartTime: 'Please select monthly parking month',
        mainlandLicensePlates: 'Please enter license plate'
      },
      messages: {
        editSuccess: 'Edited successfully',
        addSuccess: 'Monthly parking saved successfully!'
      },
      dialog: {
        editTitle: 'Edit Monthly Parking Fee',
        addTitle: 'Add Monthly Parking Fee'
      },
      errors: {
        phoneNumber: 'Invalid phone number format',
        cardId: 'Invalid ID number format',
        licensePlate: 'Invalid license plate format'
      },
      monthlyStatus: {
        valid: 'Valid',
        expired: 'Expired'
      }
    },
    reconciliation: {
      confirmTitle: 'Confirm Distribution?',
      confirmText: 'Please make the finance payment first, then click the confirm distribution button.',
      fields: {
        yearNumber: 'Billing Month',
        userName: 'Merchant',
        assignedNumber: 'Rental Spaces',
        totalDuration: 'Total Parking Duration (Hours)',
        totalAmount: 'Total Amount (CNY)',
        totalDiscountAmount: 'Total Discount Amount (CNY)',
        totalIncomeAmount: 'Total Income Amount (CNY)',
        orderTime: 'Order Time',
        status: 'Distribution Status'
      },
      placeholders: {
        yearNumber: 'Please select billing month'
      },
      actions: {
        viewFlow: 'View Flow',
        grant: 'Confirm Distribution',
        cancelGrant: 'Cancel Distribution'
      },
      messages: {
        grantSuccess: 'Distributed successfully'
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
      isBilling: 'Billing Status',
      isOutOfWarehouse: 'Exit Status',
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
      isBilling: 'Billing Status',
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
      startBilling: 'Billing Started',
      settlementBilling: 'Billing Settled',
      noBilling: 'No Billing'
    },
    billOutList: {
      settlementBilling: 'Billing Settled',
      noBilling: 'No Billing'
    }
  }
};
