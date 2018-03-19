const takePhoto = (obj) => {
  const ctx = wx.createCameraContext()
  ctx.takePhoto({
    quality: 'high',
    success: (res) => {
      if(obj && typeof obj['success'] == 'function') {
        obj['success'](res.tempImagePath);
      }
    },
    fail: function(msg) {
      if (obj && typeof obj['fail'] == 'function') {
        obj['fail'](msg);
      }
    }
  })
}

module.exports = {
  takePhoto: takePhoto
}