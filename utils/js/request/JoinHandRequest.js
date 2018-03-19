const requestModel = require('../model/RequestModelManage.js'),
  requetManage = require('./Request.js');

const joinHand = (obj) => {
  let model = requestModel.createJoinhand();
  requetManage.mixObject(model, obj.data);
  requetManage.sendPOSTRequest(
    requetManage.api.joinHand,
    model.toJson(),
    function(res){
      requetManage.successCallBack(obj)(res);
    },
    function(res){
      requetManage.failCallBack(obj)(res)
    },
    function(){
      requetManage.completeCallBack(obj)();
    }
  )
}

const memberInfo = (obj) => {
  let model = requestModel.createMemberInfo();
  requetManage.mixObject(model, obj.data);
  requetManage.sendGETRequest(
    requetManage.api.memberInfo,
    model.toJson(),
    function (res) {
      requetManage.successCallBack(obj)(res);
    },
    function (res) {
      requetManage.failCallBack(obj)(res)
    },
    function () {
      requetManage.completeCallBack(obj)();
    }
  )
}

module.exports = {
  joinHand: joinHand,
  memberInfo: memberInfo
}