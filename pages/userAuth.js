// pages/userAuth.js
const Login = require('../utils/js/UserInfoManage.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  authAction: function() {
    wx.showLoading({
      title: '请求中，请稍等...',
    })
    if (Login.userIsLogin()) {
      wx.hideLoading();
      wx.navigateBack();
      return;
    }
    if (app.userInfo.getUserInfo() != null) {
      Login.userInfo({
        success: function () {
          wx.hideLoading();
          wx.navigateBack();
        },
        // 登录9平米服务端失败
        fail: function () {
          userLogin.request.request.showError('登录失败，请稍后再试');
        }
      })
      return;
    }
    wx.openSetting({
      success: function() {
        Login.userOpenIdRequest({
          success: function () {
            Login.userAuthRequest({
              success: function () {
                wx.showLoading({
                  title: '登录中...'
                });
                Login.userInfo({
                  success: function () {
                    wx.hideLoading();
                    wx.navigateBack();
                  },
                  fail: function () {
                    wx.hideLoading();
                    wx.navigateBack();
                    Login.userRequest.request.showError('登录失败,请稍后再试');
                  }
                })
              },
              // 授权失败
              fail: function () {
                wx.hideLoading();
                Login.userRequest.request.showError('授权失败,请再次授权');
              }
            })
          },
          fail: function () {
            wx.hideLoading();
            Login.userRequest.request.showError('获取用户Id失败，请稍后再试');
          }
        })
      },
      fail: function() {
        userLogin.request.request.showError('配置失败，请稍后再试');
      }
    })
    
  },
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})