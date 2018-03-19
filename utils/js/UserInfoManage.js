const app = getApp()

const AppId = 'wxc4f4e2d0fe9228a2';
const AppSecret = 'beba78b3ed49b417ebfd80df2fde7178';
const userLogin = require('./request/UserLoginRequest.js')
const userModel = require('./model/RequestModelManage.js')

const openSeting = () => {
  wx.openSetting({
    
  })
}

const userBaseInfo = (obj) => {
  // 登录
  // 获取用户信息
  wx.getSetting({
    fail: res => {
      userLogin.request.failCallBack(obj)(res);
    },
    success: res => {
      res.authSetting = {
        "scope.userInfo": true,
        "scope.userLocation": true,
        "scope.address": true,
        "scope.writePhotosAlbum": true,
        "scope.camera": true
      }
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            app.userInfo.setAuthUserInfo(res.rawData);

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            userLogin.request.successCallBack(obj)(res);
          },
          fail: function(res){
            userLogin.request.failCallBack(obj)(res);
          }
        })
      }
    }
  })
}

module.exports = {
  userRequest: userLogin,
  userOpenIdRequest: function (obj) {
    wx.login({
      success: function (res) {
        if (res.code) {
          userLogin.getOpenId({
            data: res.code,
            success: function (res) {
              var resObj = JSON.parse(res);
              app.userInfo.setUserOpenId(resObj.openid);
              // 获取用户基本信息。
              userLogin.request.successCallBack(obj)(res);
            },
            fail: (res) => {
              userLogin.request.failCallBack(obj)(res);
            },
          })
        }
        else {
          userLogin.request.failCallBack(obj)('获取用户登录态失败！' + res.errMsg);
        }
      },
      fail: function (res) {
        userLogin.request.failCallBack(obj)(res.errMsg);
      }
    })
  },

  userAuthRequest: function(obj) {
    userBaseInfo(obj);
  },
  
  // 登录9平米客户端。
  userInfo: (obj) => {
    var authUserInfo = app.userInfo.getAuthUserInfo(),
      model = userModel.createLoginAuthorize();
    model.openid = app.userInfo.getUserOpenId();
    model.nickName = authUserInfo.nickName;
    model.gender = authUserInfo.gender;
    model.avatarUrl = authUserInfo.avatarUrl;
    model.city = authUserInfo.city;
    model.country = authUserInfo.country;
    model.province = authUserInfo.province;
    model.avatarUrl = authUserInfo.avatarUrl;
    // 用户基本信息提交给服务端
    userLogin.login({
      data: model,
      success: function (res) {
        app.userInfo.setUserInfo(res);
        userLogin.request.successCallBack(obj)(res);
      },
      fail: function () {
        userLogin.request.failCallBack(obj)();
      },
    })
  },
  // 判断是否已经登录。
  userIsLogin: function (obj) {
    // 如果已登录不操作。
    let openId = app.userInfo.getUserOpenId(),
      userInfo = app.userInfo.getUserInfo();
    return openId.length > 0 && app.userInfo.getUserInfo() != null;
  },
  userLogin: function(obj) {
    if (this.userIsLogin()) {
      userLogin.request.successCallBack(obj)();
      return;
    }
    wx.showLoading({
      title: '登录中,请稍后...',
    })
    var self = this;
    this.userOpenIdRequest({
      success: function() {
        self.userAuthRequest({
          success: function() {
            self.userInfo({
              success: function() {
                wx.hideLoading();
                userLogin.request.successCallBack(obj)();
              },
              // 登录9平米服务端失败
              fail: function() {
                userLogin.request.showError('登录失败，请稍后再试');
                userLogin.request.failCallBack(obj)();
              }
            })
          },
          // 授权失败
          fail: function() {
            wx.openSetting({
              sucess: function(res) {
                self.userInfo({
                  success: function () {
                    wx.hideLoading();
                  },
                  // 登录9平米服务端失败
                  fail: function () {
                    userLogin.request.showError('登录失败，请稍后再试');
                  }
                })
              },
              fail: function(){
                wx.navigateTo({
                  url: '/pages/userAuth',
                })
              }
            })
          }
        })
      },
      // 获取openid失败
      fail: function() {
        userLogin.request.showError('获取openId失败，请稍后再试');
      }
    })
  }
}