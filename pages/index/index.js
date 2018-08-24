//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    currentTab: 0,
    ip: 'http://192.168.43.231:3000',
    movie:[], //热映8部电影
    dia_movie:[],//待映8部
    newDay:'',
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 热映
    wx.request({
      url: `${that.data.ip}/users/search`, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {},
      header: {
      },
      success: (res) => {
        //把图片地址"\\"改成"/"
        let reg = /\\/g;
        let newdata= res.data.map((item,index) => {
       item.movie_imgAll = item.movie_imgAll.replace(reg, '/');
        return res.data
      })
      //判断是否上映
        let newMovie = newdata[0];
        for (let item of newMovie){
          //电影上映时间
          let time = new Date(item.movie_show) ;
          //当前时间
          let nowTime=new Date();
          //时间差
          let ctime = time.getTime() - nowTime.getTime();
          item.lostTime=ctime<=0;
          var cyear = time.getFullYear() - nowTime.getFullYear();//年
          var cmonth = time.getMonth() - nowTime.getMonth();//月
          var cdate = time.getDate() - nowTime.getDate();//日
          if (cyear == 0 && cmonth == 0 && cdate<=7){
            if (nowTime.getDay() + cdate <= 7) {
              item.lostDay = item.movie_show + '本周' + time.getDay() + '上映'
    }else{
              item.lostDay = item.movie_show + '下周' + time.getDay() + '上映'
            }
 }else{
            item.lostDay = item.movie_show + '上映'
          }
       }
      this.setData({
        movie: newMovie
          })
    }
    })
    //待映电影
    wx.request({
     url: `${that.data.ip}/users/search_dai`, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {},
      header: {
      },
      success: (res) => {
        //把图片地址"\\"改成"/"
        let reg = /\\/g;
        let newdata = res.data.map((item, index) => {
          item.movie_imgAll = item.movie_imgAll.replace(reg, '/');
          return res.data
        })
        let newDia = newdata[0];
        for (let item of newDia) {
         let time = new Date(item.movie_show);
          var month = time.getMonth()+1 //月
          var date = time.getDate()//日
          // console.log(item.movie_show,month,date)
          item.month_date = month +"月"+ date+"日";
        }
        let now = new Date();
        let newMonth = now.getMonth() + 1;
        let newDate = now.getDate();
        let newDay = now.getDay();
        // console.log(res.data)
        this.setData({
          dia_movie: newDia,
          newDay: newMonth + '月' + newDate + "日周" + newDay
        })
      }
    })
  
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    // var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    loadMore(that);
},
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    loadMore(that);
    console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    loadMore(this);
    console.log("lower");
  



},
  //滑动切换
  // swiperTab: function (e) {
  //   var that = this;
  //   that.setData({
  //     currentTba: e.detail.current
  //   });
  // },
  //点击切换
  clickTab: function (e) {
  var that = this;
   if (this.data.currentTab === e.target.dataset.current) {
        return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  xiangqing:function(e){
    let onename = e.currentTarget.dataset.onename;
    // console.log(11111, onename)
    wx.navigateTo({
      url: '../xiangqing/xiangqing?name=' + onename
    })

  }

})