// pages/index/warehouse/estimateSpace.js
let common = require('../../../utils/js/Common.js'),
  generateRequest = require('../../../utils/js/request/GenerateRequest.js'),
  uploadRequest = require('../../../utils/js/request/WareHouseRequest.js');
const UploadImageMaxCount = 3;
Page({
  uploadedImages: 0,
  reason: '',
  identifier: '',
  storagepointID: '',
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
  bindReasonAction: function (event) {
    this.reason = event.detail.value;
  },
  bindDescAction: function (event) {
    this.desc = event.detail.value;
  },
  deleteAction: function (event) {
    let index = event.target.dataset.index,
      self = this;
    wx.showActionSheet({
      itemList: ['删除'],
      success: function (res) {
        if (res.tapIndex == 0) {
          self.imageLists.splice(index, 1);
          self.setData({
            imageLists: self.imageLists
          })
        }
      }
    })
  },
  nextAction: function () {
    if (this.identifier.length == 0) {
      common.ui.showError('数据缺失');
      return;
    }
    if (this.reason.trim().length == 0 && this.data.selectedIndex == this.data.storeList.length - 1) {
      common.ui.showError('请输入其他内容');
      return;
    }
    if (this.imageLists.length.length == 0) {
      common.ui.showError('至少选择一张');
      return;
    }
    if (this.imageLists.length > UploadImageMaxCount) {
      common.ui.showError('只能上传' + UploadImageMaxCount + '张');
      return;
    }
    wx.showLoading({
      title: '图片上传中...',
    });
    this.uploadedImages = 0;
    this.uploadImageAction();

  },
  uploadImageAction: function () {
    var data = {};
    let self = this;
    data['filePath'] = self.imageLists[this.uploadedImages];
    data['fileName'] = 'stuffimgURL' + (this.uploadedImages + 1);
    data['id'] = self.identifier;
    uploadRequest.uploadImage({
      data: data,
      success: function () {
        ++self.uploadedImages;
        if (self.uploadedImages < self.imageLists.length) {
          self.uploadImageAction();
          return;
        }
        wx.navigateTo({
          url: './contactInfo?reason=' + self.reason.trim() + '&desc=' + self.desc + '&identifier=' + self.identifier + '&storagepointID=' + self.storagepointID,
        })
      },
      fail: function () {
        self.uploadedImages = 0;
        wx.hideLoading();
        common.ui.showError('上传失败');
      }
    })

  },
  chooseStoreTypeAction: function (event) {
    let index = event.target.dataset.index,
      self = this,
      isOther = index == self.data.storeList.length - 1;
    self.reason = isOther ? '' : event.target.dataset.reason;
    this.setData({
      selectedIndex: ~~index,
      isOther: isOther
    })
  },
  imageLists: [],
  addCamera: function () {
    let allowChooseImageCount = Math.max(0, UploadImageMaxCount - this.imageLists.length);
    if (allowChooseImageCount == 0) {
      common.ui.showError('只能上传' + UploadImageMaxCount + '张');
      return;
    }
    var self = this;
    wx.chooseImage({
      count: allowChooseImageCount,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        self.imageLists = self.imageLists.concat(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        self.setData({
          imageLists: self.imageLists,
          scrollToView: 'item' + (self.imageLists.length - 1)
        })
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
    this.setData({
      selectedIndex: 0,
      storeList: [
        { name: '搬家', id: 1 },
        { name: '换季物品', id: 2 },
        { name: '装修', id: 4 },
        { name: '闲置物品', id: 3 },
        { name: '行李寄存', id: 5 },
        { name: '其他', id: 6 }
      ],
      isShowReview: false,
      isOther: false
    })
    this.reason = this.data.storeList[this.data.selectedIndex].name;
    this.storagepointID = options.storagepointID || '';
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
    if (this.identifier.length > 0) {
      return;
    }
    let self = this;
    wx.showLoading({
      title: '请求中',
    })
    generateRequest.generate({
      success: function (res) {
        wx.hideLoading();
        self.identifier = res.id;
      },
      fail: function () {
        wx.hideLoading();
        common.ui.showError('获取失败，请稍后再试');
      }
    })
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