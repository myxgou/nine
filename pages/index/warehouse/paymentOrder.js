let paymentRequest = require('../../../utils/js/request/WareHouseRequest.js'),
   appId = 'wxc4f4e2d0fe9228a2',
  mch_id = '1465437102',
  key = '84ccb544dcddbc1d66bfac70cc475432',
  util = require('../../../utils/js/DateFormate.js'),
  common = require('../../../utils/js/Common.js'),
  md5 = require('../../../utils/js/MD5.js'),
  modelManage = require('../../../utils/js/model/RequestModelManage.js');
Page({

  /**
   * 页面的初始数据
   */
  payTotal: '',
  payExclude: '0',
  payMark: '',
  payPrice: 0,
  storagepointID: '',
  youHuiQuanID: '',
  discount: '',
  toNumber: function(value) {
    if(isNaN(value)) {
      return 0;
    }
    return value;
  },
  resetPrice: function () {
    this.payPrice = (this.toNumber(this.payTotal) - this.toNumber(this.payExclude)) * this.toNumber(this.discount) / 100;
    this.setData({
      price: this.payPrice
    })
  },

  bindPayTotalAction: function (event) {
    this.payTotal = event.detail.value;
    this.resetPrice();
  },
  bindPayExcludeAction: function (event) {
    this.payExclude = event.detail.value;
    this.resetPrice();
  },
  bindPayMarkAction: function (event) {
    this.payMark = event.detail.value;
  },
  bindPayCodeAction: function (event) {
    this.youHuiQuanID = event.detail.value;
  },

  paymentAction: function () {
    let self = this;
    if (this.storagepointID.length == 0 || this.discount.length == 0) {
      paymentRequest.request.showError('界面参数错误，请稍后再试');
      setTimeout(function () {
        wx.navigateBack();
      }, 1000);
      return;

    }
    if (this.payTotal.trim().length == 0 ||
      this.payExclude.trim().length == 0) {
      paymentRequest.request.showError('请输入支付信息');
      return;
    }
    wx.showLoading({
      title: '支付中...',
    })
    paymentRequest.payOrder({
      data: {
        storagepointID: self.storagepointID,
        discount: self.discount,
        price: self.payPrice,
        priceXuZhiFu: self.payTotal.trim(),
        priceBuDaZhe: self.payExclude.trim(),
        remarks: self.payMark
      },
      success: function (res) {
        self.createOrder(res);
      },
      fail: function (res) {
        paymentRequest.request.showError('支付异常，请稍后再试');
      }
    })
  },
  createOrder: function (res) {

    var resObj = JSON.parse(res),
      timestamp = (new Date() - 0) + '',
      nonceStr = md5.create(key + timestamp + appId + mch_id),
      packageStr = 'prepay_id=' + resObj.prepayid,
      signMergeStr = 'appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + packageStr + '&signType=MD5&timeStamp=' + timestamp + '&key=' + key,
      sign = md5.create(signMergeStr).toLocaleUpperCase();
    wx.requestPayment({
      'timeStamp': timestamp,
      'nonceStr': nonceStr,
      'package': packageStr,
      'signType': 'MD5',
      'paySign': sign,
      'success': function (res) {
        wx.reLaunch({
          url: './paymentSucess',
        })
      },
      'fail': function (res) {
        wx.hideLoading();
      }
    })
  },
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.discount = options.discount;
    this.storagepointID = options.storagepointID;
    this.setData({
      price: '0',
      uponInfo: (~~this.discount / 10).toFixed(1) + '折'
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
   * 生命周期函数--监
   * 听页面隐藏
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