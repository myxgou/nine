const requetManage = require('./Request.js'),
requestModel = require('../model/RequestModelManage.js');
const generateIdentifier = (obj) => {
  
  requetManage.sendGETRequest(
    requetManage.api.generateIdentifier,
    requestModel.createGenerateIdentifier().toJson(),
    function (res) {
      requetManage.successCallBack(obj)(res);
    },
    function () {
      requetManage.failCallBack(obj)();
    },
    function () {
      requetManage.completeCallBack(obj)();
    }
  )
}

module.exports = {
  generate: generateIdentifier
}