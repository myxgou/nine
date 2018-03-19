// pages/user/storemanage/addItem.js
let common = require('../../../utils/js/Common.js'),
  dateFormate = require('../../../utils/js/DateFormate.js'),
  goodItemRequestManage = require('../../../utils/js/request/GoodsManageRequest.js');

let MaxStarts = 5,
  SelectedStar = '/images/common/start_fill.png',
  DeSelectedStar = '/images/common/start_stroke.png';

Page({
  storagePlaceID: '',
  storagePlaceDetailID: '',
  allowImagesCount: 3,
  otherAttrs: {},
  name: '',
  starts: 0,
  date: '',
  comefrom: '',
  identifier: '',
  belongID: '',
  buyPrice: '',
  color: '',
  channel: '',
  stuffType: '',
  isAdd:false,
  uploadedImages: 0,
  bindBelongAction: function () {
    wx.navigateTo({
      url: './familyMemberList?selectedCallBack=bindBelong',
    })
  },
  bindBelong: function (obj) {
    this.belongID = obj.id;
    this.setData({
      belongName: obj.name
    })
  },
  bindColorAction: function (e) {
    this.setColor(e.detail.value);
  },
  setColor: function(color) {
    this.color = color;
    this.setData({
      color: color
    })
  },
  bindPriceAction: function (e) {
    this.setPrice(e.detail.value);
  },
  setPrice: function(price) {
    this.buyPrice = price;
    this.setData({
      buyPrice: price
    })
  },
  bindStuffAction: function (e) {
    this.setStuff(this.stuffTypeArray[e.detail.value]);
  },
  setStuff:function(stuff) {
    this.stuffType = stuff;
    this.setData({
      stuffType: this.stuffType
    })
  },
  bindChannelAction: function (e) {
    this.setChannel(this.channelArray[e.detail.value]);
  },
  setChannel: function(channel) {
    this.channel = channel;
    this.setData({
      channel: this.channel
    })
  },
  bindDesc: function(e) {
    this.setDesc(e.detail.value);
  },
  setDesc: function(desc){
    this.desc = desc;
    this.setData({
      declares: this.desc
    })
  },
  bindName: function (e) {
    this.setName(e.detail.value)
  },
  setName: function(name) {
    this.name = name;
    this.setData({
      name: name
    })
  },
  reviewTapAction: function () {
    this.setData({
      isShowReview: false
    })
  },
  reviewAction: function (e) {
    let self = this;
    this.setData({
      isShowReview: true,
      reviewImage: {
        reviewImageURL: e.target.dataset.src
      }
    })
  },
  deleteAction: function (e) {
    let index = e.target.dataset.index,
      self = this;
    wx.showActionSheet({
      itemList: ['删除'],
      success: function (res) {
        if (res.tapIndex == 0) {
          self.imageChanged = true;
          self.data.photoList.splice(index, 1);
          self.setData({
            photoList: self.data.photoList
          })
        }
      }
    })
  },
  tapStartImageAction: function (e) {
    let index = e.target.dataset.index,
      src = e.target.dataset.src;
    if (src == SelectedStar) {
      index = Math.max(0, --index);
    }
    this.setStars(index * 10);
  },
  setStars: function(stars) {
    this.starts = stars;
    this.setData({
      starts: new Array(stars / 10).fill(SelectedStar).concat(new Array(MaxStarts - stars / 10).fill(DeSelectedStar))
    })
  },
  bindAttrAction: function (e) {
    this.otherAttrs[e.target.dataset.key] = e.detail.value;
  },
  imageChanged: false,
  addImageAction: function () {
    if (this.data.photoList.length > this.allowImagesCount) {
      common.ui.showError('照片不能超过' + this.allowImagesCount + '张');
      return;
    }
    var self = this;
    wx.chooseImage({
      count: Math.max(0, this.allowImagesCount - self.data.photoList.length), // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        self.imageChanged = true;
        self.setData({
          photoList: self.data.photoList.concat(res.tempFilePaths)
        })
      }
    })
  },
  submitAction: function () {
    if (typeof this.storagePlaceID != 'string' || this.storagePlaceID.trim().length == 0) {
      common.ui.showError('参数缺失');
      return;
    }
    if (this.name.trim().length == 0) {
      common.ui.showError('请填写名称');
      return;
    }
    wx.showLoading({
      title: '提交中...',
    })
    if (this.identifier.trim().length == 0) {
      this.generateIdentifier();
      return;
    }
    this.commitInfo();
  },
  generateIdentifier: function () {
    let self = this;
    goodItemRequestManage.spaceIdentifierGenerate({
      success: function (res) {
        self.identifier = res.id;
        self.commitInfo();
      },
      fail: function () {
        wx.hideLoading();
        common.ui.showError('请求失败');
      }
    })
  },
  uploadImage: function () {
    var data = {};
    let self = this;
    data['filePath'] = this.data.photoList[this.uploadedImages];
    data['fileName'] = 'stuffimg' + (this.uploadedImages + 1);
    data['identifier'] = self.identifier;
    goodItemRequestManage.goodItemImageUpload({
      data: data,
      success: function () {
        ++self.uploadedImages;
        if (self.uploadedImages < self.data.photoList.length) {
          self.uploadImage();
          return;
        }
        wx.hideLoading();
        wx.navigateBack();
      },
      fail: function () {
        // 编辑的时候，可能会涉及到图片不是从本地获取的，所以上传会失败，正常的。
        if(!self.isAdd) {
          ++self.uploadedImages;
          if (self.uploadedImages < self.data.photoList.length) {
            self.uploadImage();
            return;
          }
          else {
            wx.hideLoading();
            wx.navigateBack();
          }
        }
        self.uploadedImages = 0;
        wx.hideLoading();
        common.ui.showError('上传失败');
      }
    })
  },
  commitInfo: function () {
    let self = this;
    goodItemRequestManage.goodItemAdd({
      data: {
        id: self.identifier,
        storagePlaceID: self.storagePlaceID,
        storagePlaceDetailID: self.storagePlaceDetailID,
        name: self.name,
        declares: self.desc,
        belongID: self.belongID,
        importance: self.starts,
        buyPrice: isNaN(self.buyPrice) ? 0 : (self.buyPrice - 0).toFixed(2) * 100,
        stuffColor: self.color,
        buyTime: self.date,
        buyChannel: self.channel,
        stuffType: self.stuffType
      },
      success: function () {
        self.uploadImage();
      },
      fail: function () {
        wx.hideLoading();
        common.ui.showError('请求失败');
      }
    })
  },
  /**
   * 页面的初始数据
   */

  data: {
    photoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  stuffTypeArray: ['衣服', '家具', '电器'],
  channelArray: ['淘宝', '京东', '亚马逊', '叮叮', '苏宁'],
  itemInfo: {},
  bindItemInfo: function(obj) {
    this.itemInfo = obj;
    this.identifier = obj.id;
    this.setStars(obj.importance);
    this.setName(obj.name);
    this.setDesc(obj.declares);
  
    var photoList = [];
    if (typeof obj.stuffimgURL1 == 'string' && obj.stuffimgURL1.length > 0) {
      photoList.push(obj.stuffimgURL1);
    }
    if (typeof obj.stuffimgURL2 == 'string' && obj.stuffimgURL2.length > 0) {
      photoList.push(obj.stuffimgURL2);
    }
    if (typeof obj.stuffimgURL3 == 'string' && obj.stuffimgURL3.length > 0) {
      photoList.push(obj.stuffimgURL3);
    }
    this.setData({
      photoList: photoList
    })
    this.belongID = obj.belongID;
    this.setData({
      belongName: obj.belongsName
    });
    this.setPrice(obj.buyPrice);
    this.setStuff(obj.stuffType);
    this.setChannel(obj.buyChannel);
    this.setDesc(obj.declares);
    this.date = dateFormate.dateFormate(new Date(obj.buyTime - 0), 'yyyy-MM-dd');
    this.setColor(obj.stuffColor);
    this.storagePlaceID = obj.storagePlaceID;
    this.storagePlaceDetailID = obj.storagePlaceDetailID;
    this.setData({
      inputDate: this.date,
      fromDate: this.date
    })
  },
  onLoad: function (options) {
    this.setData({
      stuffTypeArray: this.stuffTypeArray,
      channelsArray: this.channelArray,
      maxStarts: MaxStarts,
      isShowReview: false,
      allowImagesCount: this.allowImagesCount
    })
    this.isAdd = options.isAdd == 1;
    this.setData({
      isAdd: this.isAdd
    })
    if(!this.isAdd) {
      wx.setNavigationBarTitle({
        title: '物品编辑',
      })
      return;
    }
    this.storagePlaceDetailID = options.storagePlaceDetailID;
    this.storagePlaceID = options.storagePlaceID;
    if (typeof this.storagePlaceID != 'string' || this.storagePlaceID.trim().length == 0) {
      wx.navigateBack();
      return;
    }
    var currentDate = new Date();
    let fromDate = dateFormate.dateFormate(currentDate, 'yyyy-MM-dd');
    this.date = fromDate;
    this.setData({
      starts: new Array(MaxStarts).fill('/images/common/start_stroke.png'),
      inputDate: fromDate,
      fromDate: fromDate,
      channel: this.channel,
      belongName: '',
      isShowReview: false,
      stuffType: this.stuffType
    })
  },
  chooseDateAction: function (e) {
    this.date = e.detail.value;
    this.setData({
      inputDate: e.detail.value
    })
  },

  onEditAction: function(e) {
    let self = this;
    wx.showLoading({
      title: '处理中',
    })
    goodItemRequestManage.goodItemEdit({
      data:{
        id: self.identifier,
        storagePlaceID: self.storagePlaceID,
        storagePlaceDetailID: self.storagePlaceDetailID,
        name: self.name,
        declares: self.desc,
        belongID: self.belongID,
        importance: self.starts,
        buyPrice: isNaN(self.buyPrice) ? 0 : (self.buyPrice - 0).toFixed(2) * 100,
        stuffColor: self.color,
        buyTime: self.date,
        buyChannel: self.channel,
        stuffType: self.stuffType
      },
      success: function() {
        if (self.imageChanged) {
          self.uploadImage();
        }
        else {
          wx.hideLoading()
          wx.navigateBack({
            
          });
        }
      },
      fail: function() {

      }
    })
  },

  onDeleteAction: function(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除该物品吗？',
      success: function (res) {
        // if (res.confirm) {
        //   console.log('用户点击确定')
        // } else if (res.cancel) {
        //   console.log('用户点击取消')
        // }
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