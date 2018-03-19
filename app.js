//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力

    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.system = res;
      },
    })

  },
  userInfo: {
    addressInfo: {
      city: '',
      address: '',
      coordinate: {
        lat: 0,
        lng: 0
      }
    },
    isHandJoined: true,
    checkUserIsLogin: function (obj) {
      wx.checkSession({
        success: function () {
          obj && typeof obj['success'] == 'function' && obj['success']()
        },
        fail: function () {
          obj && typeof obj['fail'] == 'function' && obj['fail']()
        }
      })
    },
    // 可判断是否授权
    setAuthUserInfo: (obj) => {
      wx.setStorageSync('authUserInfo', obj);
    },
    getAuthUserInfo: () => {
      try {
        let baseInfo = wx.getStorageSync('authUserInfo');

        if (typeof baseInfo == 'string' && baseInfo.length > 0) {
          baseInfo = JSON.parse(baseInfo)
        }
        return baseInfo;
      }
      catch (e) {
        return null;
      }
    },

    // app相关的基本信息。
    setUserInfo: (obj) => {
      wx.setStorageSync('baseUserInfo', obj);
    },

    getUserInfo: () => {
      try {
        let baseInfo = wx.getStorageSync('baseUserInfo');
        if (typeof baseInfo == 'string') {
          baseInfo = JSON.parse(baseInfo)
        }
        return baseInfo;
      }
      catch (e) {
        return null;
      }

    },
    getUserId: function () {
      if (!this.getUserInfo()) {
        return null;
      }
      return this.getUserInfo().id;
    },
    setUserOpenId: function (openId) {
      wx.setStorageSync('nineMeterUserOpenId', openId)
    },
    getUserOpenId: function () {
      try {
        return wx.getStorageSync('nineMeterUserOpenId');
      }
      catch (e) {
        return null;
      }

    },
    checkIsLogin: function (obj) {
      wx.checkSession({
        success: function () {
          obj && typeof obj['success'] == 'function' && obj['success']();
        },
        fail: function () {
          obj && typeof obj['fail'] == 'function' && obj['fail']();
        }
      })
    }
  },
  setUtmContent: function(uid) {
    if(typeof uid == 'string') {

    wx.setStorageSync('utm-content', uid);
    }
    else {
      wx.removeStorageSync('utm-content');
    }
  },
  setUtmCampaign: function (campaign) {
    if (typeof campaign == 'string') {
      wx.setStorageSync('utm-campaign', campaign);
    }
    else {
      wx.removeStorageSync('utm-campaign');
    }
  },
  utm: function (data) {
    var self = this;
    var utm = {
      utm_source:'9pfm',
      fromflg: '10',
      language: self.system.language
    };
    try {
      let utmContent = wx.getStorageSync('utm-content');
      if (typeof utmContent == 'string' && utmContent.length > 0) {
        utm['utm_content'] = utmContent;
      }
    }
    catch(e) {

    }
    try {
      let utmCampaign= wx.getStorageSync('utm-campaign');
      if (typeof utmCampaign == 'string' && utmCampaign.length > 0) {
        utm['utm_campaign'] = utmCampaign;
      }
    }
    catch (e) {

    }
    if (typeof data == 'object') {
      for (let key in utm) {
        data[key] = utm[key];
      }
      return data;
    }
    if (typeof data == 'string') {
      var array = [];
      for (let key in utm) {
        array.push(key + '=' + utm[key]);
      }
      return data + array.join('&');
    }
  }

})