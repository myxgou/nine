let app = getApp();
class BaseObject {
  toJson() {
    var json = {};
    Object.keys(this).forEach(res => {
      if (['isNeedUserInfo','isNeedAddressInfo'].indexOf(res) >=0) {
        return;
      } 
      json[res] = this[res]; 
    });
    if (!!this['isNeedUserInfo']) {
      json['userID'] = app.userInfo.getUserId();
      json['openID'] = app.userInfo.getUserOpenId();
    }
    if (!!this['isNeedAddressInfo']) {
      json['longitude'] = app.userInfo.addressInfo.coordinate.lng;
      json['latitude'] = app.userInfo.addressInfo.coordinate.lat;
      json['city'] = app.userInfo.addressInfo.city;
    }
    
    return json;
  }
  deserialize(json) {
    for(var key in json) {
      this[key] = json[key];
    }
    
  }
  

  encodeURLParameter() {
    return Object.keys(this).map(res => { return encodeURIComponent(res) + '=' + encodeURIComponent(this[res])}).join('&');
  }
  decodeURLParameter(parameter,obj) {
    parameter.split('&').forEach(function(item){
      let index = item.indexOf('=');
      if (index > 0) {
        obj[decodeURIComponent(item.substring(0, index))] = index < item.length ? decodeURIComponent(item.substring(index + 1)) : '';
      }
    })
  }
}
module.exports = {
  baseObject : BaseObject
}