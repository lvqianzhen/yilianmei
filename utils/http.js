function http() {
    let time = new Date().getTime() / 1000;
    console.log(time.toString());
    let request_time = time.toString().replace(/\.\d{0,}/g, '');//请求时间
    console.log(request_time);
    let authorization = wx.getStorageSync('authorization');//授权成功存的字段
    this.requestUrl = 'https://nc.d-hu.cn/index.php';//请求域名
    this.data = {
        url: '',
        request_time: request_time,
        authorization: authorization
    }
    //封装request请求方法
    this.ajax = function (params, success, fail, complete, type = 'POST') {
        let that = this;
        wx.request({
            url: params.url,
            data: params,
            method: type,
            success(res) {
                if (res.statusCode == 200 && res.data.code == 2000) {//成功的状态
                    success(result);
                } else {//失败的状态  重新授权
                    that.authorization();
                }
                console.log(res);
            }
        })
    }
    //封装授权方法
    this.authorization = function () {
        wx.loading();
        let that = this;
        wx.showModal({
            title: '授权过期',
            content: '请重新授权',
            success(res) {
                if (res.confirm) {//用户点击确定
                    wx.login({
                        success(res) {
                            if (res.code) {
                                wx.request({
                                    url: '',
                                    data: {js_code: res.code},
                                    method: 'POST',
                                    success(res) {
                                        if (res.statusCode == 200 && res.data.code == 2000) {//请求成功
                                            wx.setStorageSync('authorization', res.data.data.authorization);//存授权成功字段
                                        } else {//授权不成功继续授权
                                            that.authorization();
                                        }
                                    },
                                    complete() {
                                        wx.loading('close');//取消加载
                                    }
                                })
                            }
                        }
                    })

                }
            }
        })
    }
}

module.exports = http;