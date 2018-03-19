// pages/index/order/orderTake.js
Page({
  orderDateRange: ['2017-12-13', '2017-12-14', '2017-12-15'],
  orderTimeRange: ['09-10', '10-11', '11-12'],
  _orderDate:'',
  _orderTime:'',
  _orderMark:'',
  setOrderDate: function(date) {
    this.setData({
      orderDate:date
    })
    this._orderDate = date;
  },
  setOrderTime: function (time) {
    this.setData({
      orderTime: time
    })
    this._orderTime = time;
  },
  selectDateChange:function(event){
    this.setOrderDate(this.orderDateRange[event.detail.value]);
  },
  selectTimeChange:function(event){
    this.setOrderTime(this.orderTimeRange[event.detail.value]);
  },
  writePersonInfoAction : function() {
    wx.navigateTo({
      url: './writePersonInfo',
    })
  },
  inputMarkInfoAction : function(event) {
    this.setData({
      markInfo : event.detail.value
    })

  },
  commitOrderAction : function() {
    wx.redirectTo({
      url: './orderSucess?date=2017-12-11&beginTime=11:00&endTime=12:12',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    markInfo : '',
    orderDate:'请选择日期',
    orderTime:'请选择时间段'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.setData({
      dateRange: self.orderDateRange,
      timeRange: self.orderTimeRange
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