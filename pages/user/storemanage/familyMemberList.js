// pages/user/storemanage/familyMemberList.js
const common = require('../../../utils/js/Common.js'),
  goodItemRequestManage = require('../../../utils/js/request/GoodsManageRequest.js');
Page({

  /**
   * 页面的初始数据
   */
  selectedAction: function (e) {

    let index = e.currentTarget.dataset.index;
    // 正常进来
    if (typeof this.selectedCallBack != 'string' || this.selectedCallBack.length == 0) {
      this.editMemberAction(e);
      return;
    }
    if (typeof this.selectedCallBack == 'string' && this.selectedCallBack.length > 0) {
      let pages = getCurrentPages(),
        currentPage = pages[pages.length - 2];
      wx.navigateBack();
      if (typeof currentPage[this.selectedCallBack] == 'function') {
        currentPage[this.selectedCallBack](this.data.memberList[index]);
      }
    }
  },
  selectedCallBack: '',
  selectedIndexL: -1,
  addMember: function (name, url) {
    wx.showLoading({
      title: '添加成员',
    })

  },
  editAction: function (name, icon) {
    let self = this;
    if (arguments.length == 0) {
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
      return;
    }
    this.avatarUrl = icon;
    wx.showLoading({
      title: '提交中',
    })
    if (name == this.memberName) {
      self.uploadImage();
      return;
    }
    this.memberName = name;
    
    goodItemRequestManage.familyMemberEdit({
      data: {
        id: self.memberIdentifier,
        name: self.memberName
      },
      success: function () {
        self.uploadImage();
      },
      fail: function () {
        wx.hideLoading();
        common.ui.showError('操作失败');
      }
    })
  },
  isAdd: true,
  editMemberAction: function (e) {
    this.isAdd = false;
    let item = this.data.memberList[e.currentTarget.dataset.index];
    this.memberIdentifier = item.id;
    this.memberName = item.name;
    this.infoSubmited = false;
    wx.navigateTo({
      url: '../../util/addItem?isAdd=0&title=编辑成员&callBack=editAction&name=' + item.name + '&icon=' + item.icon,
    })
  },
  addMemberAction: function () {
    this.isAdd = true;
    wx.navigateTo({
      url: '../../util/addItem?isAdd=1&title=添加成员&callBack=confirmAddMemberAction',
    })
  },
  data: {

  },
  requestFamilyMemberList: function () {
    let self = this;
    wx.showLoading({
      title: '请求中',
    })
    goodItemRequestManage.familyMemberList({
      data: {
        page: 1
      },
      success: function (data) {
        self.setData({
          memberList: data.filter((item) => {
            return typeof item.id == 'string' && item.id.length > 0 &&
              typeof item.name == 'string' && item.name.length > 0 &&
              typeof item.icon == 'string' && item.icon.length > 0;
          })
        })
        wx.hideLoading();
      },
      fail: function () {
        common.ui.showError('数据获取失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.selectedCallBack = options.selectedCallBack;
    
  },
  clearAddMemberStatus: function () {
    this.memberIdentifier = '';
    this.memberName = '';
    this.avatarUrl = '';
    this.infoSubmited = false;

  },
  memberIdentifier: '',
  memberName: '',
  avatarUrl: '',
  infoSubmited: false,
  confirmAddMemberAction: function (title, url) {

    this.memberName = title;
    this.avatarUrl = url;
    if (this.memberName.trim().length == 0) {
      common.ui.showError('请输入名称');
      return;
    }
    if (this.avatarUrl.length == 0) {
      common.ui.showError('选择照片');
      return;
    }
    wx.showLoading({
      title: '提交中',
    })
    if (this.memberIdentifier.length > 0) {
      this.commitMember();
      return;
    }
    let self = this;
    goodItemRequestManage.spaceIdentifierGenerate({
      success: function (res) {
        self.memberIdentifier = res.id;
        self.commitMember();
      },
      fail: function () {
        common.ui.showError('请求失败');
      }
    })
  },
  commitMember: function () {
    if (this.infoSubmited) {
      this.uploadImage();
      return;
    }
    let self = this;
    goodItemRequestManage.familyMemberAdd({
      data: {
        id: self.memberIdentifier,
        name: self.memberName
      },
      success: function () {
        self.infoSubmited = true;
        self.uploadImage();
      },
      fail: function () {
        self.infoSubmited = false;
        common.ui.showError('请求失败');
      }
    })
  },
  uploadImage: function () {
    let self = this;
    goodItemRequestManage.familyMemberImageUpload({
      data: {
        identifier: self.memberIdentifier,
        filePath: self.avatarUrl,
        fileName: 'icon'
      },
      success: function () {
        self.data.memberList.push({
          id: self.memberIdentifier,
          name: self.memberName,
          icon: self.avatarUrl
        });
        self.setData({
          memberList: self.data.memberList
        })
        self.clearAddMemberStatus();
      },
      fail: function () {
        if (this.isAdd) {

          common.ui.showError('请求失败');
        }
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
    this.requestFamilyMemberList();
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