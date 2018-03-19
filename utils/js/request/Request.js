const API = require('./DefineAPI.js'),
common = require('../Common.js');

function checkIsVaildResponse(data) {
  if (!data || !data.info || data.info.status != 1) {
    return false;
  }
  return true;
}

function mixUTM(data) {
  return getApp().utm(data);
}

function mixObject(target,source,isOverride) {
  if (({}).toString.call(target).toLowerCase() != '[object object]' || ({}).toString.call(source).toLowerCase() != '[object object]') {
    return target;
  }
  var override  = !!!isOverride
  for(var key in source) {
    if (typeof target[key] != 'undefined' && !override){
      continue;
    } 
    target[key] = source[key];
  }  
}

const ErrorResult = '服务器异常';

class RequestManage {
  static downLoad(requestApi, requestData, success, fail, complete) {
    wx.downloadFile({
      url: API.doMain + requestApi + (requestData ? ('?' + requestData ) : ''),
      success: function (res) {
        if (checkIsVaildResponse(res.data)) {
          typeof success == 'function' && success(res.data.data);
        }
        else {
          typeof fail == 'function' && fail((!res.data || !res.data.info || !res.data.info.message) ? ErrorResult : res.data.info.message);
        }
      },
      fail: function () {
        typeof fail == 'function' && fail(ErrorResult);
      },
      complete: function() {
        typeof complete == 'function' && complete();
      }
    })
  }
  static upLoad(requestApi, filePath, fileName, formData, success, fail, complete) {
    wx.uploadFile({
      url: API.doMain + requestApi,
      filePath: filePath,
      name: fileName,
      formData: mixUTM(formData),
      success: function(res) {
        let data = res.data;
        if(typeof data == 'string') {
          data = JSON.parse(data);
        }
        if (checkIsVaildResponse(data)) {
          typeof success == 'function' && success(data.data);
        }
        else {
          typeof fail == 'function' && fail((!data || !data.info || !data.info.message) ? ErrorResult : data.info.message);
        }
      },
      fail: function(){
        typeof fail == 'function' && fail(ErrorResult);
      },
      complete: function () {
        typeof complete == 'function' && complete();
      }
    })
  }
  static getRequest(requestApi, requestData, success, fail, complete) {
  
    wx.request({
      url: API.doMain + requestApi,
      data: mixUTM(requestData),
      method: 'GET',
      success: function (res) {
        if (checkIsVaildResponse(res.data)) {
          typeof success == 'function' && success(res.data.data);
        }
        else {
          typeof fail == 'function' && fail((!res.data || !res.data.info || !res.data.info.message) ? ErrorResult : res.data.info.message);
        }
      },
      fail: function () {
        typeof fail == 'function' && fail(ErrorResult);
      },
      complete: function () {
        typeof complete == 'function' && complete();
      }
    })
  }
  static postRequest(requestApi, requestData, success, fail, complete) {
    wx.request({
      url: API.doMain + requestApi,
      data: mixUTM(requestData),
      method: 'POST',
      success: function(res) {
        if (checkIsVaildResponse(res.data)) {
          typeof success == 'function' && success(res.data.data);
        }
        else {
          typeof fail == 'function' && fail((!res.data || !res.data.info || !res.data.info.message) ? ErrorResult : res.data.info.message);
        }
      },
      fail: function() {
        typeof fail == 'function' && fail(ErrorResult);
      },
      complete: function () {
        typeof complete == 'function' && complete();
      }
    })
  }
}
module.exports = {
  sendGETRequest: RequestManage.getRequest,
  sendPOSTRequest: RequestManage.postRequest,
  sendUploadRequest: RequestManage.upLoad,
  sendDownloadRequest: RequestManage.downLoad,
  showError: function(errMsg) {
    common.ui.showError(errMsg);
  },
  successCallBack: (obj) => {
    if (obj && obj['success'] && typeof obj['success'] == 'function') {
      return obj['success'];
    }
    return function(){

    };
  },
  failCallBack: (obj) => {
    if (obj && obj['fail'] && typeof obj['fail'] == 'function') {
      return obj['fail'];
    }
    return function () {

    };
  },
  completeCallBack: (obj) => {
    if (obj && obj['complete'] && typeof obj['complete'] == 'function') {
      return obj['complete'];
    }
    return function () {

    };
  },
  api:API,
  mixObject: mixObject
}
