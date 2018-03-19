const requestManage = require('./request/Request.js'),
  modelManage = require('./model/RequestModelManage.js');

const payment = (obj) => {
  if (!obj) {
    return;
  }
  var model = typeof obj['data'] == 'object' ? obj['data'] : null;
  if (!model) {
    requestManage.failCallBack(obj)('数据缺失');
    return;
  }
  requestManage.sendPOSTRequest(requestManage.api.postOrder, model.toJson(), function (res) {
    requestManage.successCallBack(obj)(res);
  }, function (res) {
    requestManage.failCallBack(obj)(res);
  }, function () {
    requestManage.completeCallBack(obj)();
  })

  // wx.requestPayment({
  //   'timeStamp': timeStamp,
  //   'nonceStr': nonceString,
  //   'package': packageString,
  //   'signType': 'MD5',
  //   'paySign': createPaySign(orderId, nonceString, body),
  //   'success': function (res) {
  //     console.dir(res);
  //     requestManage.successCallBack(obj)(res);
  //   },
  //   'fail': function (res) {
  //     console.dir(res);
  //     requestManage.failCallBack(obj)(res.errMsg);
  //   }
  // })
}

module.exports = {
  payment: payment
}