const requestModel = require('../model/RequestModelManage.js'),
  requetManage = require('./Request.js'),
  responseModelManage = require('../model/ResponseModelManage.js');

module.exports = {
  request: requetManage,
  payOrder: function(obj) {
    let model = requestModel.createPaymentOrder();
    requetManage.mixObject(model,obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.postOrder,
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
  list: function (obj) {
    let model = requestModel.createWarehouseList();
    requetManage.sendGETRequest(
      requetManage.api.wareHouse,
      model.toJson(),
      function (res) {
        var list = res.map(obj => {
          var model = responseModelManage.createWareHouse();
          model.deserialize(obj);
          model.isArrowRight = 1;
          return model;
        })
        requetManage.successCallBack(obj)(list);
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  detail: function(obj) {
    let model = requestModel.createWarehouseDetail();
    requetManage.mixObject(model, obj.data);
    requetManage.sendGETRequest(
      requetManage.api.wareHouseDetail,
      model.toJson(),
      function (res) {
        var model = responseModelManage.createWareHouse();
        model.deserialize(res);
        requetManage.successCallBack(obj)(model);
      },
      function () {
        requetManage.failCallBack(obj)();
      },
      function () {
        requetManage.completeCallBack(obj)();
      });
  },
  book: function(obj) {
    let model = requestModel.createWarehouseBook();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.wareHouseBook,
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
  estimate: function(obj) {
    let model = requestModel.createEstimateSpace();
    requetManage.mixObject(model, obj.data);
    requetManage.sendPOSTRequest(
      requetManage.api.spaceEstimate,
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
  uploadImage: function(obj) {
    //requestApi, filePath, fileName, formData, success, fail, complete
    requetManage.sendUploadRequest(
      requetManage.api.spaceImage +'?id='+obj.data.identifier,
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
  }
}
