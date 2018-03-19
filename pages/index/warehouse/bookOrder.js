// pages/index/warehouse/bookOrder.js

let dateFormate = require('../../../utils/js/DateFormate.js'),
  common = require('../../../utils/js/Common.js');
const defaultLong = '请选择时长';
Page({
  years: [],
  months: [],
  days: [],
  desc: '',
  storagepointID: '',
  serviceType: '1',
  nexAction: function () {
    if (this.storagepointID.length == 0) {
      common.ui.showError('参数缺失');
      return;
    }
    if (this.data.inputLong == defaultLong) {
      common.ui.showError('请选择放入时长');
      return;
    }
    wx.navigateTo({
      url: './bookHouse?storagepointID=' + this.storagepointID + '&serviceType=' + this.serviceType +
      '&inputLong=' + this.data.inputLong + '&inputDate=' + this.data.inputDate + '&desc=' + this.desc
    })
  },
  serviceChange: function (event) {
    this.serviceType = event.detail.value
  },
  bindDescAction: function (event) {
    this.desc = event.detail.value;
  },
  chooseDateAction: function (event) {
    this.setData({
      inputDate: event.detail.value
    })
  },
  chooseLongAction: function (event) {
    let selectedIndexs = event.detail.value;
    if (selectedIndexs[0] == 0 && selectedIndexs[1] == 0 && selectedIndexs[2] == 0) {

      this.setData({
        inputLong: defaultLong
      })
      return;
    }
    var inputLong = '';
    if (selectedIndexs[0] > 0) {
      inputLong = selectedIndexs[0] + "年 + ";
    }
    if (selectedIndexs[1] > 0) {
      inputLong = inputLong + selectedIndexs[1] + "月 + ";
    }
    if (selectedIndexs[2] > 0) {
      inputLong = inputLong + selectedIndexs[2] + "天";
    }
    
    if (inputLong.endsWith(' + ')) {
      inputLong = inputLong.substr(0, inputLong.length - 3)
    }
    
    this.setData({
      inputLong: inputLong
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
    this.storagepointID = options.storagepointID;
    var years = [],
      months = [],
      days = [];
    for (var i = 0; i < 11; ++i) {
      years.push(i + '年');
    }
    for (var i = 0; i < 13; ++i) {
      months.push(i + '月');
    }
    for (var i = 0; i < 32; ++i) {
      days.push(i + '天');
    }
    this.years = years;
    this.months = months;
    this.days = days;
    var currentDate = new Date();
    let fromDate = dateFormate.dateFormate(currentDate, 'yyyy-MM-dd');
    currentDate.setFullYear(currentDate.getFullYear() + 10);
    this.setData({
      longRange: [years, months, days],
      inputDate: fromDate,
      fromDate: fromDate,
      inputLong: '1个月',
      toDate: dateFormate.dateFormate(currentDate, 'yyyy-MM-dd'),
      chooseLong: false,
      chooseDate: false
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