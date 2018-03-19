const modelManage = require('../../../utils/js/model/ResponseModelManage.js'),
  wareHouseRequestManage = require('../../../utils/js/request/WareHouseRequest.js'),
  Login = require('../../../utils/js/UserInfoManage.js');

Page({
  isJoined: true,
  modelList: [],
  intoDetail: function (event) {
    let index = event.currentTarget.dataset.index;
    if (this.modelList.length <= index) {
      return;
    }
    let model = this.modelList[index];
    wx.navigateTo({
      url: './warehouseDetail?id='+model.id
    })
  },
  joinHand: function () {
    wx.navigateTo({
      url: './joinHand',
    })
  },

  requestModelList: function () {
    var self = this;
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中...',
    })
    wareHouseRequestManage.list({
      'success': function (res) {
        
        self.modelList = res.map(function (item) {
          item.isArrowRight = 1;
          for (var key in item) {
            if (key.indexOf('pic') === 0) {
              item[key] = 'http://' + item[key];
            }
          }
          return item;
        })
        self.setData({
          boxList: self.modelList,
        })
      },
      'fail': function (res) {
        wx.showToast({
          title: '请求失败，请稍后再试',
        })
        self.setData({
          boxList: []
        })
      },
      'complete': function(){
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
  },
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */

  checkLogin: function () {
    Login.userLogin({
      'success': function () {
        Login.userInfo();
      },
      'fail': function (error) {
        wx.showToast({
          title: error,
        })
      }
    });
  },

  onLoad: function (options) {
    this.checkLogin();
    const isJoined = ~~options.isJoined == 0;
    getApp().userInfo.isHandJoined = isJoined;
    this.isJoined = isJoined; 
    var self = this;
    this.requestModelList();
    this.setData({
      boxList: this.modelList,
      isJoined: self.isJoined
    })
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          pageHeight: res.windowHeight - ~~!self.isJoined * 66
        })
      },
    })
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
    this.requestModelList();
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