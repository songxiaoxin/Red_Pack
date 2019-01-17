function getTokenByUrl(){
    var token = GetQueryString("token");
    return token;
}

function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


// 获取用户ID金额
function getPlayerInfo (options) {
    var token = sessionStorage.getItem('token');
    $.ajax({
        url: '/api/get/player/info/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            options.success(data);
            //{'id':xxxx,'balance':xxxx}
        },
        error: function (data) {
            alert('未知错误')
            options.error(data);
        }
    });
}


// 点击调用游戏
function guess(amount) {
    // var token = getTokenByUrl();
    var token = sessionStorage.getItem('token')
    $.ajax({
        url: '/api/go/deposit/?amount=' + amount + '&pay_type=' + 'pay_mp',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            window.location.href = data.url
        },
        error: function (data) {
            if (data.status == 523){
                alert('游戏暂时关闭，稍后马上开启!!')
            }
            if(data.status == 524){
                alert('金额错误！')
            }else {
                alert('未知错误！')
            }
        }
    });
}

// 拆包提现
function withdraw (result,order_no) {
    var token = sessionStorage.getItem('token')
    $.ajax({
        url: '/api/do/withdraw/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        data: {'amount': result,'order_no': order_no},
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'POST',
        success: function (data) {
            alert(data.msg)
        },
        error: function (data) {
            if (data.status == 520){
                alert('金额输入错误!!')
            }
            if(data.status == 521){
                alert('金额错误！')
            }else {
                alert('提现成功！！！')
            }

        }
    });
}



// 佣金提现
function salaryWithdraw (amount) {
    var token = sessionStorage.getItem('token')
    $.ajax({
        url: '/api/salary/withdraw/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        data: {'amount': amount},
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'POST',
        success: function (data) {
            alert(data.msg)
        },
        error: function (data) {
            if (data.status == 520){
                alert('金额输入错误!!')
            }
            else {
                alert('提现成功！！！')
            }
        }
    });
}


// 佣金提现记录
function withdrawRecord (options) {
    var token = sessionStorage.getItem('token');
    //联调时打开
    $.ajax({
        url: '/api/withdraw/record/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            options.success(data);
            // {'results': [{'amount':20,''created':'2019-01-02 19:20'},{'amount':20,''created':'2019-01-02 19:20'}]}
        },
        error: function (data) {
            options.error(data);
            alert('金额输入错误!!');

        }

    });
}


// 佣金记录
function salaryRecord (options) {
    var token = sessionStorage.getItem('token');
    // 联调时打开
    $.ajax({
        url: '/api/salary/record/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            // 传入回调进行渲染
            options.success(data);
            // {'results': [{'amount':20,'created':'2019-01-02 19:20','remark':'xxxxxx'}]}
        },
        error: function (data) {
            alert('金额输入错误!!')
            options.error(data);
        }

    });
}


// 获取二维码
function myQr (options) {
    var token = sessionStorage.getItem('token')
    $.ajax({
        url: '/api/my/qr/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            options.success(data);
            // {'url': '图片地址'}
        },
        error: function (data) {
            alert('未知错误!!')
            options.error(data);
        }

    });
}


// 代理没级人数
function level (options) {
    var token = sessionStorage.getItem('token');
    $.ajax({
        url: '/api/player/level/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            options.success(data);
            // {
            //    'id':player.id,
            //    'level_1':1,
            //    'level_2':30,
            //    'level_3':2,
            //    'level_4':32),
            //    'level_5':1,
            //    'level_6':4,
            //    'level_7':5,
            // }
        },
        error: function (data) {
            options.error(data);
            alert('未知错误!!')
        }

    });
}


// 我的佣金，我的工资
function mySalary (options) {
    var token = sessionStorage.getItem('token')
    $.ajax({
        url: '/api/player/salary/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            options.success(data);
            // {
            //    'id': xxxx,
            //    'salary_today': 今日佣金,
            //    'salary_yesterday': 昨日,
            //    'salary_total': 总,
            //    'reward': 可领工资,
            // }
        },
        error: function (data) {
            options.error(data);
            alert('未知错误!!')
        }

    });
}


//领取工资
function getReward () {
    var token = sessionStorage.getItem('token')
    $.ajax({
        url: '/api/get/reward/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            if(data.success){
                alert('领取成功')
            }else {
                alert('您已经领过了！！')
            }
        },
    });
}

// 未拆红包
function redEnvelopes (options) {
    var token = sessionStorage.getItem('token')
    $.ajax({
        url: '/api/red/envelopes/',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Token " + token);
        },
        dataType: 'JSON',
        async: false,//请求是否异步，默认为异步
        type: 'GET',
        success: function (data) {
            options.success(data);

        },
        error: function (data) {
            options.error(data);
            alert('未知错误!!')
        }

    });
}

// 是否弹窗
function isVipKf (options) {
    var token = sessionStorage.getItem('token');
    var data={'display':1,'img':'xxxxx'};
    // $.ajax({
    //     url: '/api/display/kf/',
    //     beforeSend: function(request) {
    //         request.setRequestHeader("Authorization", "Token " + token);
    //     },
    //     dataType: 'JSON',
    //     async: false,//请求是否异步，默认为异步
    //     type: 'GET',
    //     success: function (data) {
    //         options.success(data);
    //
    //     },
    //     error: function (data) {
    //         options.error(data);
    //         alert('未知错误!!')
    //     }
    //
    // });
}
