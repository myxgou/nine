var BaseObject = require('../BaseObject.js').baseObject;
class WareHouseResponse extends BaseObject {
  constructor() {
    super();
    this.id;
    this.pointName;
    this.pointNumb;
    this.listPicUrl;
    this.storageCompanyName;
    this.recommend;
    this.spaceUnit;
    this.price;
    this.pointService;
    this.distance;
    this.address;
    this.hot;
    this.declares;
    this._starNumber;
    this.starUrls;
    this.discount;
    this._device;
    this.showStuffPicURL;
    this.pic1;
    this.pic2;
    this.pic3;
    this.pic4;
    this.pic5;
    this.pic6;
  }
  set device(value) {
    if(typeof value == 'string') {
      this._device = JSON.parse(value);
    }
    else if(({}).toString.call(value).toLowerCase() == '[string array]') {
      this._device = value;
    }
    else {
      this._device = [];
    }
    
  }

  get device(){
    return this._device;
  }

  set starNumber(value) {
    
    const starts = Math.min(isNaN(value) ? 0 : Math.floor(value / 10), 5);
    
    this.starUrls = Array(starts).fill('/images/common/start_fill.png').concat(Array(5 - starts).fill('/images/common/start_stroke.png'))
  }

  get starNumber() {
    // console.log(value);
    return this._starNumber;
  }
}

class LoginResponse {
  constructor() {
    this.id;
    this.name;
    this.phone;
    this.isPartner;
    this.companyName;
    this.address;
    this.verified;
    this.youHuiMa;
  }
}

class GoodsSpaceResponse {
  constructor() {
    this.id;
    this.name;
    this.icon;
    this.declares;
  }
}

module.exports = {
  createWareHouse: function () {
    var wareHouse = new WareHouseResponse();
    return wareHouse;
  },
  createLogin: function () {
    var login = new LoginResponse();
    return login;
  },
  createGoodsSpace: function() {
    var goodsSpace = new GoodsSpaceResponse();
    return goodsSpace;
  }
}