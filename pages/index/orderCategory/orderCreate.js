// pages/index/orderCategory/orderCreate.js
const appId = 'wxc4f4e2d0fe9228a2',
  mch_id = '1465437102',
  key = '84ccb544dcddbc1d66bfac70cc475432',
  util = require('../../../utils/js/DateFormate.js'),
  common = require('../../../utils/js/Common.js'),
  paymentManage = require('../../../utils/js/PaymentManage.js'),
  md5 = require('../../../utils/js/MD5.js'),
  modelManage = require('../../../utils/js/model/RequestModelManage.js');
Page({
  warehouseId: '',
  endDateOffsetDays: 3,
  rentPrice: 5,
  salePrice: 68,
  getCubeMeters: function () {
    return Array.from(Array(21).keys()).slice(1).map(function (res) { return res + '' });
  },
  getManyBoxs: function () {
    return Array.from(Array(21).keys()).slice(1).map(function (res) { return res + '' });
  },
  selectMonthMany: function (event) {
    var month = event.detail.value - 0 + 1;
    this.setMonth(month);
    var endDate = new Date(this.data.startDate);
    endDate.setMonth(endDate.getMonth() + (month - 0));
    endDate.setDate(endDate.getDate() + this.endDateOffsetDays);

    this.setData({
      endDate: util.dateFormate(endDate, 'yyyy-MM-dd')
    });
  },
  setMonthMany: function (monthMany) {

    this.setData({
      monthMany: Array.from(Array(monthMany + 1).keys()).slice(1).map(function (res) { return res + '' })
    });
  },
  defaultMonth: 1,
  selectMany: function (event) {
    this.setMany(event.detail.value);

  },
  setMany: function (many) {
    this.setData({ many: many + '' });
    this.reSetMoney();
  },
  selectEndDate: function (event) {
    var date = new Date(event.detail.value);
    date.setDate((new Date(this.data.fromDate)).getDate());
    this.setData({ endDate: util.dateFormate(date, 'yyyy-MM-dd') });
    this.processSelectedDate();
  },
  selectStartDate: function (event) {
    this.setBeginDate(event.detail.value);
    this.processSelectedDate();
  },
  processSelectedDate: function () {
    var startDate = new Date(this.data.startDate),
      endDate = new Date(this.data.endDate),
      month = endDate.getFullYear() * 12 + endDate.getMonth() - startDate.getFullYear() * 12 - startDate.getMonth();
    this.setMonth(month);
  },
  setMonth: function (month) {
    var self = this;
    this.setData({
      month: month + ''
    });
    this.reSetMoney();
  },
  reSetMoney: function () {
    var self = this;
    this.setData({
      paymentNotice: '￥' + self.data.month * self.data.price * self.data.many
    })
  },
  setPrice: function (price) {
    this.setData({ price: price + '' });
    this.reSetMoney();
  },
  setBeginDate: function (date) {
    var beginDate = new Date(date),
      endDate = new Date(date);
    var fromStartDateString = util.dateFormate(beginDate, 'yyyy-MM-dd');
    beginDate.setYear(beginDate.getFullYear() + 5);
    var toStartDateString = util.dateFormate(beginDate, 'yyyy-MM-dd');
    endDate.setMonth(endDate.getMonth() + this.defaultMonth);
    endDate.setDate(endDate.getDate() + this.endDateOffsetDays);

    var fromEndDateString = util.dateFormate(endDate, 'yyyy-MM-dd');
    endDate.setYear(endDate.getFullYear() + 5);
    var toEndDateString = util.dateFormate(endDate, 'yyyy-MM-dd');
    this.setData({
      startDate: fromStartDateString,
      endDate: fromEndDateString,
      fromStartDateString: fromStartDateString,
      toStartDateString: toStartDateString,
      fromEndDateString: fromEndDateString,
      toEndDateString: toEndDateString
    })
  },
  radioChange: function (event) {
    var value = event.detail.value,
      price = this.data.priceList.filter(item => item.id == value).map(item => item.price)[0];
    this.setPrice(price);
  },
  paymentAction: function () {
    this.createOrder();
    
  },
  createOrder: function () {
    wx.showLoading({
      title: '生成订单中'
    })
    var self = this;
    var baseInfo = getApp().userInfo.getUserInfo();
    var model = modelManage.createPaymentOrder();
    model.cangWeiID = this.warehouseId;
    model.userID = baseInfo.id;
    model.openID = getApp().userInfo.getUserOpenId();
    model.youHuiQuanID = '';
    model.price = this.data.price;
    model.rentMonth = this.data.month;
    model.rentDateFrom = this.data.startDate;
    model.rentDateTo = this.data.endDate;
    paymentManage.payment({
      data: model,
      success: function (res) {
        var resObj = JSON.parse(res),
          timestamp = (new Date() - 0) + '',
          nonceStr = md5.create(key + timestamp + appId + mch_id),
          packageStr = 'prepay_id=' + resObj.prepayid,
          signMergeStr = 'appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + packageStr + '&signType=MD5&timeStamp=' + timestamp + '&key=' + key,
          sign = md5.create(signMergeStr).toLocaleUpperCase();
        wx.requestPayment({
          'timeStamp': timestamp,
          'nonceStr': nonceStr,
          'package': packageStr,
          'signType': 'MD5',
          'paySign': sign,
          'success': function (res) {
            wx.redirectTo({
              url: './paymentSucess'
            })
          },
          'fail': function (res) {
            wx.hideLoading();
          }
        })
      },
      fail: function (res) {
        common.ui.showError(res)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  processBoxType: function (isSmall) {
    var self = this,
      date = new Date();
    this.setMonthMany(18);
    this.setBeginDate(util.dateFormate(date, 'yyyy-MM-dd'));
    if (isSmall) {
      this.setData({
        manyUnit: self.getManyBoxs(),
        month: self.defaultMonth,
        priceTitle: '标准月费', //月费
        priceOffset: '', //左右
        unitTitle: '需要箱子个数', //需要立方数字
        unit: '个', // 立方
        orderTypeTitle: '箱子使用方式?', //箱子使用方式?
        timeTitle: '存储时间',// 服务期限
        paymentTip: '根据实际存储多退少补',//先付定金,确认空间大小后付全款(自动退定金)
        paymentButtonTip: '立即支付', //立即预定
        paymentNotice: '￥0', // 空间预付定金￥99
        isSmall: isSmall
      })
    }
    else {
      this.setData({
        manyUnit: self.getCubeMeters(),
        month: self.defaultMonth,
        priceTitle: '月费',
        priceOffset: '左右',
        unitTitle: '需要立方数字',
        unit: '立方',
        orderTypeTitle: '立方数?',
        timeTitle: '服务期限',
        paymentTip: '先付定金,确认空间大小后付全款(自动退定金)',
        paymentButtonTip: '立即预定',
        paymentNotice: '空间预付定金￥99',
        isSmall: isSmall
      })
    }
    this.setMany(1);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isSmall = options.type == 0,
      rentPrice = options.rentPrice,
      salePrice = options.salePrice;
    this.warehouseId = options.warehouseId;
    this.processBoxType(isSmall);
    this.rentPrice = rentPrice;
    this.salePrice = salePrice;
    var priceList = [];
    if (this.rentPrice > 0) {
      this.setPrice(rentPrice);
      priceList.push({ title: '出租' + rentPrice + '元/月', id: priceList.length + '', price: rentPrice });
    }
    if (this.salePrice > 0) {
      if (this.rentPrice <= 0) {
        this.setPrice(salePrice);
      }
      priceList.push({ title: '出售' + salePrice + '元/个', id: priceList.length + '', price: salePrice });
    }
    this.setData({
      priceList: priceList
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