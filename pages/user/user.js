// pages/user/user.js
const util = require('../../utils/js/DateFormate.js'),
 app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {
      avatarUrl: '/images/tabbar/user_icon.png',
      nickName: '匿名用户',
      certification: false,
      serviceDate: util.dateFormate(new Date(),'yyyy-MM-dd')
    },
    
    list: [
      {
        id: 'order',
        name: '我的订单',
        icon:'/images/common/order.png',
        page: '/pages/user/memberInfoRoute'
      }, {
        id: 'coupon',
        name: '优惠券',
        icon: '/images/common/upon.png',
        page: '/pages/user/coupon'
      }, {
        id: 'invited',
        name: '我的邀请',
        icon: '/images/common/invited.png',
        page: './inviteFriend'
      }, {
        id: 'manage',
        name: '物品管理',
        icon: '/images/common/managed.png',
        page: './storemanage/manageIndex'
      }, {
        id: 'subscribe',
        name: '预约送达',
        icon: '/images/common/bookorder.png',
        page: '/pages/user/subscribe'
      }
    ]
  },
  loginAgain: function() {
    if (app.userInfo.getAuthUserInfo() != null) {
      this.setData({
        userInfo: app.userInfo.getAuthUserInfo(),
        hasUserInfo: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    app.userInfo.checkUserIsLogin({
      success: function() {
        self.setData({
          userInfo: app.userInfo.getAuthUserInfo(),
          hasUserInfo: true
        })
      },
      fail: function() {
        self.loginAgain()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})