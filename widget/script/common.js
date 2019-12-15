var j = {};


// 打开窗口
j.openWin = function (url, param) {
    api.openWin({
        name: 'page1',
        url: url,
        pageParam: param
    });
}






// UI组件
/*
*打印
*/
j.log = function (content) {
    var result;
    if (typeof content === Object) {
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
