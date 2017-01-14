Page({
    startDrifting () {
        wx.request({
          url: 'https://book.douban.com/subject/3930318/',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            wx.showToast({
                title: 'sss'
            })
          },
          fail: function(err) {
            wx.showToast({
                title: 'fff'
            })
          },
          complete: function() {
            // complete
          }
        })
    }
})