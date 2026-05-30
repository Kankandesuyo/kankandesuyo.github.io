Page({
  data: {
    report: null
  },

  onShow() {
    const app = getApp();
    this.setData({
      report: app.globalData.report
    });
  },

  restart() {
    const app = getApp();
    app.resetTest();
    wx.redirectTo({
      url: '/pages/test/test'
    });
  }
});
