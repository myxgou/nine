const requestModel = require('../model/RequestModelManage.js'),
  requetManage = require('./Request.js');
const sendVerifyCode = (obj) => {
  let tel = obj && typeof obj['tel'] == 'string' ? obj['tel'] : '',
    codeType = obj && typeof obj['type'] == 'string' ? obj['type'] : '';
  if (!/^1\d{10}$/.test(tel)) {
    requetManage.failCallBack(obj)('电话号码无效，请检查后再试');
    return;
  }
  requetManage.sendGETRequest(
    requetManage.api.sendVerify,
    { 'mobile': tel, 'type': codeType },
    function () {
      requetManage.successCallBack(obj)();
    },
    function () {
      requetManage.failCallBack(obj)();
    },
    function() {
      requetManage.completeCallBack(obj)();
    }
    )
}

module.exports = {
  sendVerifyCode: sendVerifyCode
}