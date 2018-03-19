// pages/index/orderCategory/paymentSucess.js
const verifyCodeManage = require('../../../utils/js/request/SendVerifyCode.js'),
  common = require('../../../utils/js/Common.js'),
  requestModeManage = require('../../../utils/js/model/RequestModelManage.js'),
  joinHandManage = require('../../../utils/js/request/JoinHandRequest.js');
Page({
  timeSeconds: 60,
  retainSeconds: 60,
  timeCountHandle: null,
  realName: '',
  telPhone: '',
  verifyCode: '',
  address: '',
  mark: '',
  company: '',
  bindInputRealName: function (event) {
    this.realName = event.detail.value;
  },
  bindInputTel: function (event) {
    this.telPhone = event.detail.value;
  },
  bindInputVerifyCode: function (event) {
    this.verifyCode = event.detail.value;
  },
  bindInputAddress: function (event) {
    this.address = event.detail.value;
  },
  bindInputMark: function (event) {
    this.mark = event.detail.value;
  },
  bindInputCompany: function (event) {
    this.company = event.detail.value;
  },
  setIsSend: function (isSend) {
    var self = this;
    this.setData({
      isSend: isSend,
      verifyTitle: isSend ? (self.timeSeconds + '秒'):'获取验证码'
    })
    if(isSend) {
      this.retainSeconds = this.timeSeconds;
      if (this.timeCountHandle) {
        clearInterval(this.timeCountHandle);
        this.timeCountHandle = null;
      }
      this.timeCountHandle = setInterval(function(){
        --self.retainSeconds
        if (self.retainSeconds <= 0) {
          self.retainSeconds = self.timeSeconds;
          self.setIsSend(false);
          clearInterval(self.timeCountHandle);
          self.timeCountHandle = null;
          return;
        }
        self.setData({
          verifyTitle: self.retainSeconds + '秒'
        });
      },1000);
    }
  },
  sendVerifyCode: function (event) {
    var self = this;
    if (!/^1\d{10}$/.test(this.telPhone)) {
      common.ui.showError('电话号码无效');
      return;
    }
    this.setData({
      isSend: true
    })
    wx.showLoading({
      title: '验证码发送中'
    })
    verifyCodeManage.sendVerifyCode({
      tel: this.telPhone,
      type: '30',
      success: function () {
        self.setIsSend(true);
        wx.showToast({
          title: '发送成功'
        })
      },
      fail: function () {
        self.setIsSend(false);
        wx.showToast({
          title: '发送失败，请稍后再试'
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  commitPersonInfoAction: function () {
    if (this.realName.length == 0) {
      common.ui.showError('请输入真实姓名')
      return;
    }

    if (this.telPhone.length == 0 || !/^1\d{10}$/.test(this.telPhone)) {
      common.ui.showError('无效的联系电话')
      return;
    }
    if (this.verifyCode.length == 0) {
      common.ui.showError('请输入验证码')
      return;
    }
    if (this.mark.length == 0) {
      common.ui.showError('请输入备注信息')
      return;
    }
    wx.showLoading({
      title: '提交中'
    });
    let model = requestModeManage.createJoinHands(),
      user = getApp().userInfo.getBaseInfo();
    model.id = getApp().userInfo.getUserId();
    model.name = this.realName;
    model.phone = this.telPhone;
    model.gender = user.gender;
    model.city = user.city;
    model.province = user.province;
    model.companyName = this.company;
    model.address = this.address;
    joinHandManage.joinHand({
      data: model.toJson(),
      success: function () {
        getApp().userInfo.isHandJoined = true;
        var pages = getCurrentPages(),
        currentPage = pages[pages.length - 2];
        currentPage.setData({
          isJoined: true
        })
        wx.showToast({
          title: '提交成功'
        });
        setTimeout(function () {
          wx.hideToast();
          wx.navigateBack({
            delta: 1
          })
        }, 1000);
      },
      fail: function (err) {
        common.ui.showError('提交失败:' + err)
      },
      complete: function () {
        wx.hideLoading();
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
    this.setIsSend(false);
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