// pages/xiangqing/xiangqing.js
Page({
 data: {
   ip: 'http://192.168.43.231:3000',
    movie:{},//点击的电影信息
    movieActor:[],//演员图片
    actorName:[],//演员名字
    
    actorNameJ:[],//饰演的角色
    isTrue:true,//状态，下拉剧情介绍
    movie_img:[],//剧照
    movie_userComment:[]
 },
onLoad: function (options) {
  // console.log(options.name)
    wx.request({
      url: `${this.data.ip}/users/findOne`, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: { movie_name: options.name},
      header: {
      },
      success: (res) => {
        let reg = /\\/g;
        res.data[0].movie_imgAll = res.data[0].movie_imgAll.replace(reg, '/');
        res.data[0].movie_img = res.data[0].movie_img.replace(reg, '/');
        res.data[0].movie_director_img = res.data[0].movie_director_img.replace(reg, '/');
        res.data[0].movie_actor_img = res.data[0].movie_actor_img.replace(reg, '/');
        //演员名字
       let aname= res.data[0].movie_actor.split(',');
       let newAname= aname.map((item)=>{
        return item.slice(0, item.indexOf('.') ) 
       })
       let newJname = aname.map((item) => {
         return item.slice(item.indexOf('.')+1)
       })
       //剧照
       let newImg=res.data[0].movie_img.split(',');
      let newComment= res.data[0].movie_userComment.split('/');
      //  console.log(newImg)
      this.setData({
          movie: res.data[0],
          movieActor: res.data[0].movie_actor_img.split(','),
          actorName: newAname,
          actorNameJ:newJname,
          movie_img: newImg,
          movie_userComment: newComment
    })
      // console.log(this.data.movie_userComment)
      }
    })

  },
zhankai:function(e){
  if(this.data.isTrue){
    this.setData({
      isTrue: false
    })
  }else{
    this.setData({
      isTrue:true
    })
  }
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})