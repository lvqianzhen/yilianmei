const app = getApp();
Page({
    data:{
        day:'',//相识天数
        hours:'',//相识天数多余的小时数
        minutes:'',//相识天数多余的分钟数
        seconds:'',//相识天数多余的秒数
    },
    onLoad:function(options) {
        let _this = this;
        this.getTime();
        this.setData({                    //每隔一分钟刷新一次
            timer: setInterval(function () {
                _this.getTime();
            }, 1000)
        });
    },
    getTime(){
        let knowTime = '2019/10/01';
        let knowTime1 = new Date(knowTime);
        let presentTime = new Date();
        let timeCha = presentTime.getTime() - knowTime1.getTime();
        let day = Math.floor(timeCha / (24 * 3600 * 1000));//计算出相差天数
        let leave1 = timeCha%(24*3600*1000);    //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1/(3600*1000));//计算出小时数
        //计算相差分钟数
        let leave2 = leave1%(3600*1000);    //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2/(60*1000));//计算相差分钟数
        //计算相差秒数
        let leave3 = leave2%(60*1000);     //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3/1000);
        this.setData({
            day:day,
            hours:hours,
            minutes:minutes,
            seconds:seconds
        })
    }
});
