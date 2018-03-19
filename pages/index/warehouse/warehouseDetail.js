const modelManage = require('../../../utils/js/model/ResponseModelManage.js'),
common = require('../../../utils/js/Common.js'),
requestManage = require('../../../utils/js/request/WareHouseRequest.js');
Page({

  reviewTapAction: function () {
    this.setData({
      isShowReview: false
    })
  },
  reviewAction: function (event) {
    let self = this;
    this.setData({
      isShowReview: true,
      reviewImage: {
        reviewImageURL: event.target.dataset.src
      }
    })
  },

  bookAction: function() {
    let identifier = this.data.warehouse.id;
    if (typeof identifier != 'string' || identifier.trim().length == 0) {
      common.ui.showError('数据缺失');
      return;
    }
    wx.navigateTo({
      url: './bookOrder?storagepointID=' + identifier,
    })
  },
  paymentAction: function() {

    if (typeof this.data.warehouse == 'undefined') {
      common.ui.showError('数据缺失');
      return;
    }
    let identifier =  this.data.warehouse.id.trim(),
    discount = this.data.warehouse.discount;
    if (identifier.length == 0 || typeof discount == 'undefined') {
      common.ui.showError('数据缺失');
      return;
    }
    wx.navigateTo({
      url: './paymentOrder?discount=' + discount + '&storagepointID=' + identifier,
    })
  },
  estimateAction: function() {
    wx.switchTab({
      url: './estimateSpace',
    });
  },
  createOrder: function () {
    var model = this.data.warehouse;
    wx.navigateTo({
      url: '../orderCategory/orderCreate?type=0&rentPrice=' + model.price+'&warehouseId='+model.id
    })
  },
  data: {
    isModel: false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this,identifier = options.id;
    this.setData({
      isShowReview: false
    })
    wx.showLoading({
      title: '加载中...',
    });
    requestManage.detail({
      data:{
        storagepointid: identifier
      },
      success: function(model) {
        model['storageCompanyName'] = '';
        
        wx.hideLoading();
        self.setData({
          isModel: true,
          warehouse: model,
          device: model.device,
          discount: (model.discount / 10).toFixed(1),
          reviewImages: model.showStuffPicURL.split(';')
        })
      },
      fail: function() {
        common.ui.showError('请求失败，请稍后再试');
      }
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