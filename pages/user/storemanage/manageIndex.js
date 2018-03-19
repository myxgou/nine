// pages/user/storemanage/manageIndex.js
const common = require('../../../utils/js/Common.js'),
  goodItemRequestManage = require('../../../utils/js/request/GoodsManageRequest.js');
Page({
  spaceList: [],
  goodItemsList: [],
  goodItemsPage: 0,
  spaceListPage: 0,
  name: '',
  bindName: function (e) {
    this.name = e.detail.value;
  },
  intoFamilyMemberList: function () {
    wx.navigateTo({
      url: './familyMemberList?isAdd=1',
    })
  },
  goodItemsListRequest: function () {
    wx.showLoading({
      title: '请求中',
    })
    let self = this;
    goodItemRequestManage.goodItemslist({
      data: {
        page: self.goodItemsPage++
      },
      success: function (res) {
        wx.hideLoading();
        let filterList = res.filter((item) => {
          return typeof item.id == 'string' && 
          typeof 'item.storagePlaceID' == 'string' && 
          item.id.length > 0 && 
          item.storagePlaceID.length > 0;
        }).map((item) => {
          if (typeof item.coversPic != 'string' || item.coversPic.trim().length == 0) {
            item.coversPic = '/images/manage/space-default.png';
          }
          return item;
        });
        self.goodItemsList = self.goodItemsPage > 1 ? self.goodItemsList.concat(res) : res;
        self.setData({
          goodItemsList: self.goodItemsList
        })
      },
      fail: function () {
        common.ui.showError("请求失败");
      }
    })
  },
  spaceListRequest: function () {
    wx.showLoading({
      title: '请求中',
    })
    let self = this;
    goodItemRequestManage.spaceList({
      data: {
        page: self.spaceListPage++
      },
      success: function (res) {
        wx.hideLoading();
        self.spaceList = res.map((item) => {
          if (typeof item.icon != 'string' || item.icon.trim().length == 0) {
            item.icon = '/images/manage/space-default.png';
          }
          return item;
        });
        self.setData({
          spaceList: self.spaceList
        })
      },
      fail: function () {
        common.ui.showError("请求失败");
      }
    })
  },
  intoItemDetailAcion:function(e) {
    let index = e.currentTarget.dataset.index;
    if (index >= this.goodItemsList.length || index < 0) {
      return;
    }
    let item = this.goodItemsList[index];
    wx.navigateTo({
      url: './goodItem?isAdd=0',
      success: function() {
        setTimeout(function () {
          let itemPage = getCurrentPages()[getCurrentPages().length - 1];
          itemPage.bindItemInfo(item);
        }, 500)
      }
    });
  },
  intoSpaceDetailAcion: function (e) {
    let index = e.currentTarget.dataset.index;
    if (index >= this.spaceList.length || index < 0) {
      return;
    }
    let item = this.spaceList[index];
    wx.navigateTo({
      url: './spaceDetail?title=' + item.name + '&icon=' + item.icon + '&storagePlaceID=' + item.id,
    })
  },
  chooseTypeAction: function (isItems) {
    if (this.data.isItems == isItems) {
      return;
    }
    this.setData({
      isItems: isItems
    })
    if (isItems) {
      this.goodItemsPage = 0;
      this.goodItemsListRequest();
    }
    else {
      this.spaceListPage = 0;
      this.spaceListRequest();
    }
  },
  chooseItemsAction: function () {
    this.chooseTypeAction(true);
  },

  chooseSpaceAction: function () {
    this.chooseTypeAction(false);
  },
  maxId: function () {
    var count = Math.max(0, this.spaceList.length - 1)
    return count - ~~(count % 2 == 1)
  },
  spaceIdentifer: '',
  infoSubmited: false,
  clearSpaceStatus: function () {
    this.spaceIdentifer = '';
    this.infoSubmited = false;
  },
  addSpaceItem: function (id, title, image) {
    this.spaceList.push({
      title: title,
      icon: image,
      id: id
    });
    this.clearSpaceStatus();
    this.setData({
      spaceList: this.spaceList
    });
    if (this.spaceList.length % 2 === 0) {
      return;
    }
    this.setData({
      scrollToView: 'group' + this.maxId()
    })
  },

  commitAddSpaceAction: function (title, url) {
    let self = this;
    if (title.length == 0) {
      common.ui.showError('请输入名称');
      return;
    }
    if (url.length == 0) {
      common.ui.showError('请选择照片');
      return;
    }
    wx.showLoading({
      title: '提交中',
    });
    if (this.spaceIdentifer.length == 0) {
      goodItemRequestManage.spaceIdentifierGenerate({
        success: function (res) {
          self.spaceIdentifer = res.id;
          self.commitSpace(title, url);
        },
        fail: function () {
          common.ui.showError('请求失败');
        }
      })
      return;
    }
    self.commitSpace();
  },
  commitSpace: function (name, url) {
    if (this.infoSubmited) {
      this.uploadImage(url);
      return;
    }
    let self = this;
    goodItemRequestManage.spaceAdd({
      data: {
        id: self.spaceIdentifer,
        name: name
      },
      success: function () {
        self.infoSubmited = true;
        self.uploadImage(url);
      },
      fail: function () {
        self.infoSubmited = false;
        common.ui.showError('请求失败');
      }
    })
  },
  uploadImage: function (url) {
    let self = this;
    goodItemRequestManage.spaceImageUpload({
      data: {
        identifier: self.spaceIdentifer,
        filePath: url,
        fileName: 'icon'
      },
      success: function () {
        self.addSpaceItem(self.spaceIdentifier, self.spaceTitle, self.spaceUrl)
      },
      fail: function () {
        common.ui.showError('请求失败');
      }
    })
  },
  addSpaceAction: function () {
    wx.navigateTo({
      url: '../../util/addItem?isAdd=1&title=添加空间&callBack=commitAddSpaceAction',
    })
  },
  /**
   * 页面的初始数据
   */

  data: {
    isItems: true
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
    // this.refreshList();
    if (this.data.isItems) {
      this.goodItemsPage = 0;
      this.goodItemsListRequest();
    }
    else {
      this.spaceListPage = 0;
      this.spaceListRequest();
    }
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

    // this.refreshList();
  },

  refreshList: function () {
    // wx.showNavigationBarLoading();
    // let addSpace = common.disposableStore.pull(common.storeKey.addSpaceKey);
    // if (typeof addSpace != "object") {
    //   return;
    // }
    // this.spaceList.push(addSpace);
    // this.setData({ spaceList: this.spaceList});
    // wx.stopPullDownRefresh();
    // wx.hideNavigationBarLoading();
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