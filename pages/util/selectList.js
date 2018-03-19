// pages/user/storemanage/selectList.js
Page({
  selectedIndex:-1,
  /**
   * 页面的初始数据
   */
  selectItemAction: function(e) {
    this.selectedIndex = e.currentTarget.dataset.index;
    this.setData({
      selectedIndex: this.selectedIndex
    })
  },
  submitAction: function() {
    
    wx.navigateBack({
    });
    let prePage = getCurrentPages()[getCurrentPages().length - 2];
    if (typeof this.callBack == 'string' && 
    this.callBack.length > 0 && 
    typeof prePage[this.callBack] == 'function') {
      prePage[this.callBack](this.selectedIndex);
    }
  },
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  callBack:'',
  onLoad: function (options) {
    this.callBack = options.callBack;
    wx.setNavigationBarTitle({
      title: options.title,
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