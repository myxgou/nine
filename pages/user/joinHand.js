// pages/user/joinHand.js
const common = require('../../utils/js/Common.js'),
    joinHandManage = require('../../utils/js/request/JoinHandRequest.js');
const app = getApp();
Page({
  sex: 1,
  businessArray: [{ title: "保险业" }, { title: "采矿" }, { title: "能源" }, { title: "餐饮" }, { title: "宾馆" }, { title: "电讯业" }, { title: "房地产" }],
  checked: false,
  bindName: function(e) {
    this.setData({'name':e.detail.value});
  },
  bindTel: function (e) {
    this.setData({ 'tel': e.detail.value });
  },
  bindAdress: function (e) {
    this.setData({ 'address': e.detail.value });
  },
  bindCompany: function (e) {
    this.setData({ 'company': e.detail.value });
  },
  checkAction: function(e) {
    this.checked = e.detail.value.length > 0;
  },
  radioSexAction: function(e) {
    this.sex = e.detail.value;
  },
  chooseBuiness: function(e) {
    let self = this;
    wx.navigateTo({
      url: '../util/selectList?title=选择行业&callBack=chooseBuinessAction',
      success:function(e) {
        setTimeout(function() {
          let currentPage = getCurrentPages()[getCurrentPages().length - 1];
          currentPage.setData({
            dataList: self.businessArray
          })
        },500);
      }
    })
  },
  chooseBuinessAction: function(index) {
    
    if(isNaN(index)) {
      return;
    }
    if (index < 0 || index >= this.businessArray.length) {
      return;
    }
    this.setData({
      busniess:this.businessArray[index].title
    })
  },
  submitAction: function() {
    if (!this.checked) {
      common.ui.showError('请先同意合作协议');
      return;
    }
    let self=this,
    name = this.data.name,
    tel = this.data.tel,
    address = this.data.address || '',
    business = this.business,
    company = this.data.company || '';
    if(typeof name != 'string' || name.length == 0) {
      common.ui.showError('请填写姓名');
      return;
    }
    if (typeof tel != 'string' || !/^1\d{10}$/.test(tel)) {
      common.ui.showError('请填写联系人手机号码');
      return;
    }

    if (typeof company != 'string' || company.length == 0) {
      common.ui.showError('请填写公司名字');
      return;
    }
    wx.showLoading({
      title: '申请中',
    })
    joinHandManage.joinHand({
      data: { 
        name: name, 
        phone: tel, 
        gender: self.sex, 
        companyName: company, 
        address: address
      },
      success: function() {
        wx.hideLoading();
        wx.reLaunch({
          url: './joinHandSucess',
        })
      },
      fail: function() {
        wx.hideLoading();
        common.ui.showError('操作失败');
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
      busniess:''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

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