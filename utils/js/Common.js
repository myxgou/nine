module.exports = {
  storeKey: {
    addSpaceKey: 'addSpaceKey'
  },
  defined: {
    itemsAttrs: [
      {title: '星级', attr: 'starts'},
      {title: '分类', attr: 'category'},
      {title: '归属人', attr: 'own'},
      {title: '价格', attr: 'price'},
      {title: '颜色', attr: 'color'},
      {title: '季节', attr: 'season'},
      {title: '获取渠道', attr: 'channel'}
    ],
    itemsStarts:5,
    itemsSeason:['春','夏','秋','冬'],
    setItemsCategory: function(categorys) {
      wx.setStorageSync('ItemsCategory', categorys)
    },
    getItemsCategory: function() {
      return wx.getStorageInfoSync('ItemsCategory');
    },
    setItemsColor: function (colors) {
      wx.setStorageSync('ItemsColors', colors)
    },
    getItemsColor: function() {
      return wx.getStorageInfoSync('ItemsColors');
    },
    setItemsChannel: function (channels) {
      wx.setStorageSync('ItemsChannels', channels)
    },
    getItemsChannel: function() {
      return wx.getStorageInfoSync('ItemsChannels');
    },
    setItemsPerson: function(persons) {
      wx.setStorageSync('ItemsPersons', persons)
    },
    getItemsPerson: function() {
      return wx.getStorageInfoSync('ItemsPersons');
    }
  },
  ui : {
    showError: (obj) => {
      wx.showToast({
        title: obj,
        image: '/images/common/error.png'
      })
    }
  },
  disposableStore : {
    push: (key,value) => {
      wx.setStorageSync(key, value);
    },
    pull: (key) => {
      var value = wx.getStorageSync(key);
      wx.clearStorage(key);
      return value;
    }
  }
}