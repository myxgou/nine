//index.js
//获取应用实例
const Login = require('../../utils/js/UserInfoManage.js');
const QQMapLocationUrl = 'https://apis.map.qq.com/ws/geocoder/v1/?key=VDPBZ-7COLX-JDF4W-ZD3UE-PV5PF-ZAB6V&coord_type=5&location=';
const app = getApp();
Page({
  intoStoreAction: function() {
    wx.navigateTo({
      url: './warehouse/warehouse',
    })
  },
  locationAction: function() {
    var self = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        wx.request({
          url: QQMapLocationUrl + res.latitude+','+res.longitude,
          success:(res)=>{
            app.userInfo.addressInfo.city = res.data.result.ad_info.city;
            app.userInfo.addressInfo.address = res.data.result.address;
            app.userInfo.addressInfo.coordinate = res.data.result.ad_info.location;

          }
        })
      },
      fail: function(res) {
        wx.openSetting({
          success: function (res) {
            if (res.authSetting['scope.userLocation'] == false) {
              wx.showModal({
                title: '提示',
                content: '您未开启定位权限，将导致无法使用本软件',
                showCancel: false,
                success: function (res) {
                  self.locationAction();
                }
              });
            } else {
              self.locationAction();
            }
          }
        });
      }
    })
    
  },
  data: {
  },
  userLogin: function () {
    Login.userLogin({
      'success': function(){
        Login.userInfo();
      },
      'fail': function(error) {
        wx.showToast({
          title: error,
        })
      }
    });
  },
  onShow: function() {
    this.userLogin();
  },
  onLoad: function () {
    
    this.locationAction();

  }
})
