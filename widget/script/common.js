var j = {};


// 打开窗口

j.openWin = function (url, param) {
    api.openWin({
        name: 'page1',
        url: url,
        pageParam: param
    });
}
j.openWinNav = function (url, param, title) {
    var name = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    api.openTabLayout({
        name: name,
        url: url,
        title: title,
        pageParam: param,
        hideNavigationBar: false,
        navigationBar: {
            height: 45,                  //（可选项）导航栏高度。默认值45。数字类型
            background: '#fff',             //（可选项）导航栏背景。支持颜色值和图片，默认值#fff，字符串类型
            shadow: '#fff',                  //（可选项）导航栏底部阴影线颜色。默认值#ddd，字符串类型
            color: '#000',
            leftButtons: [{
                iconPath: 'widget://image/post/black_back_arrow.png'
            }],
            rightButtons: [{
                iconPath: 'widget://image/post/dh.png'
            }]

        }
    });
}




//公共功能
/*
*   获取当前经纬度
*   param: {
        callback: function (lat, lon) {
                    lat: '维度'， lon：'经度'
                  }
*   }
*/
j.getCurLocation = function (callback) {
    var resultList = api.hasPermission({
        list:['location']
    });
    if (resultList[0].granted === false) {
        j.log('没有定位权限');
    }
    api.requestPermission({
        list:['location'],
        code:1
    }, function(ret, err) {
        if (err) {
            j.toast('获取定位权限失败');
            return;
        }
        var resultList = api.hasPermission({
            list:['location']
        });
        if (resultList[0].granted === false) {
            j.log('没有定位权限');
        }
        api.getLocation(function(ret, err) {
            if (err) {
                j.toast('获取当前地理位置信息失败');
                return;
            }
            if (ret && ret.status) {
                //ret.timestamp
                callback(ret.latitude, ret.longitude);
            }
        });
    });
}



// UI组件
/*
*打印
*/
j.log = function (content) {
    if (typeof content === 'object' || typeof content === Object) {
        console.log(JSON.stringify(content));
        return;
    }
    if (typeof content === Array || typeof content === 'array') {
        console.log(JSON.stringify(content));
        return;
    }
    console.log(content);
}
// 弹窗提示
j.toast = function (msg) {
    api.toast({
        msg: msg,
        duration: 2000,
        location: 'bottom'
    });
}
// 下拉刷新
j.pullDownRefresh = function (cb) {
    var param = {
        loadingImg: 'widget://image/public/wangyuanjing.png',
        bgColor: 'rgba(0, 0, 0, 0)',
        textColor: '#fff',
        textDown: '下拉刷新...',
        textUp: '松开刷新...'
    };
    api.setRefreshHeaderInfo(param, function(ret, err) {
            cb(ret, err);
            api.showProgress({
                title: '努力加载中...',
                text: '先喝杯茶...',
                modal: false
            });
            api.refreshHeaderLoadDone();
            setTimeout(function () {
                api.hideProgress();
            }, 2000);
    });
}
// 上拉加载
j.scrolltobottom = function (cb) {
    api.addEventListener({
        name:'scrolltobottom',
        extra:{
            threshold:0            //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    }, function(ret, err){
        cb(ret, err);
    });
}
$j = j;
