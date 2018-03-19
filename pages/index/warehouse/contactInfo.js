// pages/index/warehouse/contactInfo.js
const common = require('../../../utils/js/Common.js'),
  estimateRequest = require('../../../utils/js/request/WareHouseRequest.js');
Page({
  reason: '',
  desc: '',
  identifier: '',
  storagepointID: '',
  /**
   * 页面的初始数据
   */
  bindName: function (event) {
    this.setData({
      name: event.detail.value
    });
  },
  bindTel: function (event) {
    this.setData({
      tel: event.detail.value
    });
  },
  bindAddress: function (event) {
    this.setData({
      address: event.detail.value
    });
  },
  commitAction: function () {
    let name = this.data.name,
      tel = this.data.tel,
      address = this.data.address,
      self = this;
    if (name.trim().length == 0 || /^1\d10$/.test(tel) || address.trim().length == 0) {
      common.ui.showError('请填写完整信息');
      return;
    }
    wx.showLoading({
      title: '处理中',
    })
    estimateRequest.estimate({
      data: {
        id: self.identifier,
        storagepointID: self.storagepointID,
        putReason:self.reason,
        remarks:self.desc,
        userName:name,
        mobileNumber:tel,
        address:address
      },
      success: function() {
        wx.hideLoading();
        wx.reLaunch({
          url: './commitConactInfoSucess',
        })
      },
      fail: function() {
        wx.hideLoading();
        common.ui.showError('操作失败，请稍后再试');
      }
    })
  },
  data: {
    address: '',
    tel: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reason = options.reason;
    this.desc = options.desc;
    this.identifier = options.identifier;
    this.storagepointID = options.storagepointID;
    this.setData({
      address: getApp().userInfo.addressInfo.address
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