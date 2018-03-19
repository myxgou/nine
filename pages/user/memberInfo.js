const app = getApp(),
QR = require('../../utils/js/qrcode.js');
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
    let userInfo = app.userInfo.getAuthUserInfo()
    QR.qrApi.draw("2222", 'mycanvas', 150, 150)
    this.setData({
      name: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      statusList: [
        { key: '访客数', value: ~~options.fangkeshu }, 
        { key: '成交数', value: ~~options.chengjiaoshu }, 
        { key: '成交金额', value: (~~options.chengjiaojine / 100).toFixed(2) }]
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