// pages/user/storemanage/selectList.js
let common = require('../../../utils/js/Common.js');
Page({
  selectedIndex:-1,
  /**
   * 页面的初始数据
   */
  selectItemAction: function(e) {
    this.selectedIndex = e.target.dataset.index;
    this.setData({
      selectedIndex: this.selectedIndex
    })
  },
  submitAction: function() {
    if (this.selectedIndex < 0) {
      common.ui.showError('请选择');
      return;
    }
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