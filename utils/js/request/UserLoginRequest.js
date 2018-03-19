const requestModel = require('../model/RequestModelManage.js'),
  requetManage = require('./Request.js')

module.exports = {
  request: requetManage,
  login: function (obj) {
    requetManage.sendPOSTRequest(
      requetManage.api.login,
      obj['data'],
      function (res) {
        requetManage.successCallBack(obj)(res);
      },
      function (res) {
        requetManage.failCallBack(obj)(res);
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  getOpenId: function (obj) {
    requetManage.sendGETRequest(
      requetManage.api.openId,
      { loginCode: obj['data'] },
      function (res) {
        requetManage.successCallBack(obj)(res);
      },
      function (res) {
        requetManage.failCallBack(obj)(res);
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  }
}