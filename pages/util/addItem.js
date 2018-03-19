// pages/user/storemanage/addSpace.js
const common = require('../../utils/js/Common.js');
Page({
  callBack: '',
  isAdd: false,
  selectedImage: false,
  spaceTitle:'',
  selectedUrl: '/images/common/camera.png',
  resetNameAction: function (e) {
    this.spaceTitle = e.detail.value;
  },
  chooseImageFromLibrary: function () {
    var self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        self.selectedUrl = res.tempFilePaths.shift() || '';
        self.selectedImage = true;
        self.setData({
          selectedUrl: self.selectedUrl
        })
      }
    })
  },
  takePhotoAction: function () {
    this.chooseImageFromLibrary();
  },
  confirmAddSpaceAction: function () {
    if (this.spaceTitle.trim().length == '') {
      common.ui.showError('请输入名称');
      return;
    }
    if (!this.selectedImage) {
      common.ui.showError('选择照片');
      return;
    }
    wx.navigateBack({
      
    });
    var pages = getCurrentPages(),
      currentPage = pages[pages.length - 2];
    if (this.callBack.length > 0 && typeof currentPage[this.callBack] == 'function') {
      currentPage[this.callBack](this.spaceTitle.trim(), this.selectedUrl);
    }
  },

  onEditAction: function () {
    if (this.spaceTitle.trim().length == '') {
      common.ui.showError('请输入名称');
      return;
    }
    if (!this.selectedImage) {
      common.ui.showError('选择照片');
      return;
    }
    wx.navigateBack({

    });
    var pages = getCurrentPages(),
      currentPage = pages[pages.length - 2];
    if (this.callBack.length > 0 && typeof currentPage[this.callBack] == 'function') {
      currentPage[this.callBack](this.spaceTitle.trim(), this.selectedUrl);
    }
  },
  
  onDeleteAction: function () {
    wx.navigateBack({

    });
    var pages = getCurrentPages(),
      currentPage = pages[pages.length - 2];
    if (this.callBack.length > 0 && typeof currentPage[this.callBack] == 'function') {
      currentPage[this.callBack]();
    }
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
    this.isAdd = options.isAdd == 1;

    this.callBack = options.callBack;
    wx.setNavigationBarTitle({
      title: options.title,
    });

    if(!this.isAdd) {
      this.setData({
        selectedUrl: options.icon,
        name:options.name
      })
      this.spaceTitle = options.name;
      this.selectedImage = typeof options.icon == 'string' && options.icon.length > 0; 
      return;
    }

    this.setData({
      selectedUrl: this.selectedUrl
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