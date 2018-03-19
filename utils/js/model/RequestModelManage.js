var BaseObject = require('../BaseObject.js').baseObject;

// 用户管理
class LoinRequest extends BaseObject {
  constructor() {
    super();
    this.openid;
    this.nickName;
    this.gender;
    this.language;
    this.city;
    this.province;
    this.country;
    this.avatarUrl;
  }
}

class JoinHandRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;

    this.name = '';
    this.phone = '';
    this.gender = '';
    this.companyName = '';
    this.address = '';
  }
}

class MemberInfoRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
  }
}

// 物品存取
class PostOrderRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;
    
    this.storagepointID = '';    
    this.youHuiQuanID = '';
    this.discount = '';
    this.price = '';
    this.priceXuZhiFu = '';
    this.priceBuDaZhe = '';
    this.remarks = '';
  }
}


class WarehouseListRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;

    this.utm_medium = 'youxuan';
    this.utm_term = 'hot';
    this.utm_campaign = 'list';
    this.utm_content = '1801-hot';
    
  }
}

class WarehouseDetailRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;
    
    this.storagepointid = '';

    this.utm_medium = 'youxuan';
    this.utm_term = 'hot';
    this.utm_campaign = 'list';
    this.utm_content = '1801-hot';
  }
}

class WarehouseBookRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;
    
    this.storagepointID = '';
    this.putIntoDate = '';
    this.storageDate = '';
    this.serviceType = 1;//: { 服务选择: 1自助，2上门存取} int
    this.remarks = '';
    this.userName = '';
    this.mobileNumber = '';
    this.address = '';
    this.haslift = 10; //{ 有电梯 10：有；20无}

  }
}

class WarehouseEstimateRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;

    this.id = '';
    this.storagepointID = '';
    this.putReason = '';
    this.remarks = '';
    this.userName = 1;
    this.mobileNumber = '';
    this.address = '';
  }
}

class GenerateIdentifier extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;
  }
}


// 物品管理

class GoodsSpaceListRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;

    this.page = 1;
  }
}

class GoodsSpaceIdentifierGenerateRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;
  }
}

class GoodsSpaceAddRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;

    this.id = '';
    this.name = '';
    this.icon = '';
    this.declares = '';
  }
}

class GoodsSpaceEditRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;

    this.id = '';
    this.name = '';
    this.icon = '';
    this.declares = '';
  }
}

class StorageBoxListRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;

    this.page = 1;
    this.storageplaceID = '';
  }
}

class StorageBoxAddRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;

    this.id = '';
    this.storageplaceID = '';
    this.name = '';
    this.icon = '';
    this.declares = '';
  }
}

class StorageBoxEditRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;

    this.id = '';
    this.storageplaceID = '';
    this.name = '';
    this.icon = '';
    this.declares = '';
  }
}

class FamilyMemberListRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;
    this.isNeedAddressInfo = true;

    this.page = 1;
  }
}

class FamilyMemberAddRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;

    this.id = '';
    this.icon = '';
    this.name = 1;
    this.declares = ''
  }
}

class FamilyMemberEditRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;

    this.id = '';
    this.icon = '';
    this.name = 1;
    this.declares = ''
  }
}

class GoodItemListRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;

    this.page = 1;
    this.storageplaceID = '';
    this.storageplacedetailID = '';
    this.belongID = '';
  }
}

class GoodItemAddRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;

    this.id = '';
    this.name = '';
    this.declares = '';
    this.storagePlaceID = ''; //一级位置id
    this.storagePlaceDetailID = '';//二级位置id
    this.belongID = ''; //所属用户
    this.stuffType = '';
    this.importance = ''; //五颗星[10/20、30/40/50] 10可处理、20一般 [默认]、30重要
    this.buyPrice = ''; //单位分
    this.stuffColor = '';
    this.buyTime = '';
    this.buyChannel = ''; 
  }
}

class GoodItemEditRequest extends BaseObject {
  constructor() {
    super();
    this.isNeedUserInfo = true;

    this.id = '';
    this.name = '';
    this.declares = '';
    this.storagePlaceID = ''; //一级位置id
    this.storagePlaceDetailID = '';//二级位置id
    this.belongID = ''; //所属用户
    this.stuffType = '';
    this.importance = ''; //五颗星[10/20、30/40/50] 10可处理、20一般 [默认]、30重要
    this.buyPrice = ''; //单位分
    this.stuffColor = '';
    this.buyTime = '';
    this.buyChannel = '';
  }
}

module.exports = {
  createPaymentOrder: function(){
    let postOrder = new PostOrderRequest();
    return postOrder;
  },
  createJoinHands: function () {
    let joinHands = new JoinHandRequest();
    return joinHands;
  },
  createLoginAuthorize: function () {
    let loinAuthorize = new LoinRequest();
    return loinAuthorize;
  },
  createWarehouseList: function () {
    let warehouseListRequest = new WarehouseListRequest();
    return warehouseListRequest;
  },
  createWarehouseDetail: function() {
    let warehouseDetailRequest = new WarehouseDetailRequest();
    return warehouseDetailRequest;
  },
  createWarehouseBook: function() {
    let warehouseBookRequest = new WarehouseBookRequest();
    return warehouseBookRequest;
  },
  createGenerateIdentifier: function() {
    let generateIdentifier = new GenerateIdentifier();
    return generateIdentifier;
  },
  createEstimateSpace: function() {
    let warehouseEstimateRequest = new WarehouseEstimateRequest();
    return warehouseEstimateRequest;
  },
  createGoodsSpaceList: function() {
    let goodsSpaceList = new GoodsSpaceListRequest();
    return goodsSpaceList;
  },
  createGoodsSpaceAdd: function() {
    let goodsSpaceAdd = new GoodsSpaceAddRequest();
    return goodsSpaceAdd;
  },
  createGoodsSpaceEdit: function () {
    let goodsSpaceEdit = new GoodsSpaceEditRequest();
    return goodsSpaceEdit;
  },
  createStorageList: function() {
    let storageBoxList = new StorageBoxListRequest();
    return storageBoxList;
  }
  ,createStorageEdit: function() {
    let storageBoxEdit = new StorageBoxEditRequest();
    return storageBoxEdit;
  }
  ,createStorageAdd: function() {
    let storageBoxAdd = new StorageBoxAddRequest();
    return storageBoxAdd;
  }
  ,createFamilyMemberList: function() {
    let familyMemberList = new FamilyMemberListRequest();
    return familyMemberList;
  }
  ,createFamilyMemberAdd: function() {
    let familyMemberAdd = new FamilyMemberAddRequest();
    return familyMemberAdd;
  }
  ,createFamilyMemberEdit: function() {
    let familyMemberEdit = new FamilyMemberEditRequest();
    return familyMemberEdit;
  }
  ,createGoodItemsList: function() {
    let goodItemsList = new GoodItemListRequest();
    return goodItemsList; 
  }
  ,createGoodItemAdd: function() {
    let goodItemAdd = new GoodItemAddRequest();
    return goodItemAdd;
  }
  ,createGoodItemEdit: function() {
    let goodItemEdit = new GoodItemEditRequest();
    return goodItemEdit;
  }
  ,createJoinhand: function() {
    let joinHand = new JoinHandRequest();
    return joinHand;
  }
  ,createMemberInfo: function() {
    let memberInfo = new MemberInfoRequest();
    return memberInfo;
  }
}

