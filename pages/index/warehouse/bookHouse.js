let common = require('../../../utils/js/Common.js'),
  requestManage = require('../../../utils/js/request/WareHouseRequest.js');
Page({
  storagepointID: '',
  serviceType: '',
  inputLong: '',
  inputDate: '',
  desc: '',
  lift: 10,
  liftChange: function (event) {
    this.lift = event.detail.value;
  },
  bindName: function (event) {
    this.setData({
      name: event.detail.value
    })
  },
  bindTel: function (event) {
    this.setData({
      tel: event.detail.value
    })
  },
  bindAddress: function (event) {
    this.setData({
      address: event.detail.value
    })
  },
  commitAction: function () {
    if (this.storagepointID.length == 0) {
      common.ui.showError('参数缺失');
      return;
    }
    let self = this,
      name = this.data.name,
      tel = this.data.tel,
      address = this.data.address;
    if (
      name.trim().length == 0 ||
      tel.trim().length == 0 ||
      address.trim().length == 0) {
      common.ui.showError('请完整填写');
      return;
    }
    wx.showLoading({
      title: '提交中',
    });
    requestManage.book({
      data: {
        storagepointID: self.storagepointID,
        putIntoDate: self.inputDate,
        storageDate: self.inputLong,
        serviceType: self.serviceType,
        remarks: self.desc,
        userName: name,
        mobileNumber: tel,
        address: address,
        haslift:self.lift
      },
      success: function () {
        wx.hideLoading();
        wx.reLaunch({
          url: './commitConactInfoSucess',
        })
      },
      fail: function () {
        common.ui.showError('操作失败，请稍后再试');
      }
    })

  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storagepointID = options.storagepointID;
    this.serviceType = options.serviceType;
    this.inputLong = options.inputLong;
    this.inputDate = options.inputDate;
    this.desc = options.desc;
    this.setData({
      name: '',
      tel: '',
      address: '',
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