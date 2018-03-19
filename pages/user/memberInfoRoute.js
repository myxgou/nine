let Login = require('../../utils/js/UserInfoManage.js'),
  common = require('../../utils/js/Common.js'),
  joinHandManage = require('../../utils/js/request/JoinHandRequest.js');
Page({

  /**
   * 页面的初始数据
   */
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
  requestMemberInfo: function () {
    let self = this;
    wx.showLoading({
      title: '请求中...',
    })
    joinHandManage.memberInfo({
      data: {},
      success: function (res) {
        wx.hideLoading();
        wx.reLaunch({
          url: './memberInfo?fangkeshu=' + res.fangkeshu + '&chengjiaoshu=' + res.chengjiaoshu + "&chengjiaojine=" + res.chengjiaojine,
        })
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '请求失败，是否重试',
          success: function (res) {
            if (res.confirm) {
              self.requestMemberInfo();
            } else if (res.cancel) {
              wx.navigateBack();
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  userLogin: function () {
    let self = this;
    Login.userLogin({
      'success': function () {
        Login.userInfo({
          success: function () {
            self.requestMemberInfo();
          },
          fail: function () {
            console.log(111)
          }
        });
      },
      'fail': function (error) {
        wx.showToast({
          title: error,
        })
      }
    });
  },
  onShow: function () {
    this.userLogin();
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