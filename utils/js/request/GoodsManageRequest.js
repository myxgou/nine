const requestModel = require('../model/RequestModelManage.js'),
  requetManage = require('./Request.js'),
  responseModelManage = require('../model/ResponseModelManage.js');
module.exports = {
  request: requetManage,
  spaceIdentifierGenerate: function (obj) {
    let model = requestModel.createGenerateIdentifier();
    requetManage.mixObject(model, obj.data);
    requetManage.sendGETRequest(
      requetManage.api.getstorageplaceID,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)(res);
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  spaceList: function (obj) {
    let model = requestModel.createGoodsSpaceList();
    requetManage.mixObject(model, obj.data);
    requetManage.sendGETRequest(
      requetManage.api.getSpaces,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)(res);
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  spaceAdd: function (obj) {
    let model = requestModel.createGoodsSpaceAdd();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.addSpace,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  spaceEdit: function (obj) {
    let model = requestModel.createGoodsSpaceAdd();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.spaceEdit,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  spaceImageUpload: function(obj) {
    requetManage.sendUploadRequest(
      requetManage.api.spaceImageUpload + '?id=' + obj.data.identifier,
      obj.data.filePath,
      obj.data.fileName,
      {},
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  
  secondSpaceList: function (obj) {
    let model = requestModel.createGoodsSpace();
    requetManage.mixObject(model, obj.data);
    requetManage.sendGETRequest(
      requetManage.api.getSecondSpaces,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)(res);
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  secondSpaceAdd: function (obj) {
    let model = requestModel.createGoodsSpaceAdd();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.addSecondSpace,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  secondEditSpace: function (obj) {
    let model = requestModel.createGoodsSpaceAdd();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.secondSpaceEdit,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  secondSpaceImageUpload: function (obj) {
    requetManage.sendUploadRequest(
      requetManage.api.secondSpaceImageUpload + '?id=' + obj.data.identifier,
      obj.data.filePath,
      obj.data.fileName,
      {},
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  familyMemberList: function (obj) {
    let model = requestModel.createFamilyMemberList();
    requetManage.mixObject(model, obj.data);
    requetManage.sendGETRequest(
      requetManage.api.familyMemberList,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)(res);
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  familyMemberAdd: function (obj) {
    let model = requestModel.createFamilyMemberAdd();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.familyMemberAdd,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  familyMemberEdit: function (obj) {
    let model = requestModel.createFamilyMemberEdit();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.familyMemberEdit,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },

  familyMemberImageUpload: function (obj) {
    requetManage.sendUploadRequest(
      requetManage.api.familyMemberImageUpload + '?id=' + obj.data.identifier,
      obj.data.filePath,
      obj.data.fileName,
      {},
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },

  goodItemslist: function (obj) {
    let model = requestModel.createGoodItemsList();
    requetManage.mixObject(model, obj.data);
    requetManage.sendGETRequest(
      requetManage.api.goodsList,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)(res);
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  goodItemAdd: function (obj) {
    let model = requestModel.createGoodItemAdd();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.goodAdd,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  goodItemEdit: function (obj) {
    let model = requestModel.createGoodItemEdit();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.goodEdit,
      model.toJson(),
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  goodItemImageUpload: function (obj) {
    requetManage.sendUploadRequest(
      requetManage.api.goodImageUpload + '?id=' + obj.data.identifier,
      obj.data.filePath,
      obj.data.fileName,
      {},
      function (res) {
        requetManage.successCallBack(obj)();
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
}
