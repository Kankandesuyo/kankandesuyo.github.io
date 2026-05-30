Page({
  startTest() {
    const app = getApp();
    app.resetTest();
    wx.navigateTo({
      url: '/pages/test/test'
    });
  }
});
