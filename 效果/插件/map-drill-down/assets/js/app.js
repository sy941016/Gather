//地图容器
let chart = echarts.init(document.getElementById('main'));
//34个省、市、自治区的名字拼音映射数组
let provinces = {
    //23个省
    "台湾": "taiwan",
    "河北": "hebei",
    "山西": "shanxi",
    "辽宁": "liaoning",
    "吉林": "jilin",
    "黑龙江": "heilongjiang",
    "江苏": "jiangsu",
    "浙江": "zhejiang",
    "安徽": "anhui",
    "福建": "fujian",
    "江西": "jiangxi",
    "山东": "shandong",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "广东": "guangdong",
    "海南": "hainan",
    "四川": "sichuan",
    "贵州": "guizhou",
    "云南": "yunnan",
    "陕西": "shanxi1",
    "甘肃": "gansu",
    "青海": "qinghai",
    //5个自治区
    "新疆": "xinjiang",
    "广西": "guangxi",
    "内蒙古": "neimenggu",
    "宁夏": "ningxia",
    "西藏": "xizang",
    //4个直辖市
    "北京": "beijing",
    "天津": "tianjin",
    "上海": "shanghai",
    "重庆": "chongqing",
    //2个特别行政区
    "香港": "xianggang",
    "澳门": "aomen"
};
let mapdata = [];
//直辖市和特别行政区-只有二级地图，没有三级地图
let special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
//绘制全国地图
$.getJSON('assets/map/china.json', function (data) {
    for (let i = 0; i < data.features.length; i++) {
        mapdata.push({
            name: data.features[i].properties.name,
            value: Math.round(Math.random() * 1000)
        })
    }
    //注册地图
    echarts.registerMap('china', data);
    //绘制地图
    renderMap('china', mapdata);
    $("button").click(function () {
        renderMap('china', mapdata);
        // console.log($('select').value)
        $('select').val(1)
    })
});

//下拉切换
$('select').change(function () {
    if (this.value == '中国') {
        renderMap('china', mapdata);
    } else {
        getCity(this.value, 0)
    }
})

//地图点击事件
chart.on('click', function (params) {
    console.log(params);
    if (params.name in provinces) {
        getCity(params.name, 0)
    } else if (params.seriesName in provinces) {
        getCity(params.name, 1)
    }
});

//城市坐标
let geoCoordMap = {
    "上海": [121.48, 31.22],
    "重庆": [106.54, 29.59],
    "北京": [116.46, 39.92],
    "天津": [117.2, 39.13],
    "四川": [104.08038, 30.695528]
};
//组装data用于scatter
let convertData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

//全国地图配置
function renderMap(map, data) {
    let option = {
        backgroundColor: 'green',
        title: {
            subtext: '',
            left: 'center',
            subtextStyle: {
                color: '#000',
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        legend: {},
        geo: {
            map: map
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            },
            iconStyle: {
                normal: {
                    color: '#fff'
                }
            }
        },
        animationDuration: 1000,//初始动画的时长
        animationEasing: 'cubicOut',//初始动画的缓动效果
        animationDurationUpdate: 1000//数据更新动画的时长
    };
    option.title.subtext = map == 'china' ? '中国' : map;
    option.series = [
        {
            name: map,
            type: 'map',
            map: map,
            roam: false,
            nameMap: {
                'china': '中国'
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#999',
                        fontSize: 13
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 13
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'red',
                    areaColor: '#FEFCD6',
                    borderColor: '#98BAB9',
                    borderWidth: 3
                },
                emphasis: {
                    areaColor: '#6A98F2'
                }
            },
            data: data
        }
    ];
    let option1 = {...option};
    option1.series.push(
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data), //data数组项     name:地图坐标+value数据值
            symbol: 'image://assets/img/1.jpg',//可自定义图片
            symbolSize: 20,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            }
        }
    )

    //渲染地图
    if (map == 'china') {
        chart.setOption(option1);
    } else {
        chart.setOption(option);
    }
}

//获取城市json
function getCity(name, i) {
    let url
    if (i == 0) {
        url = 'assets/map/province/' + provinces[name] + '.json'
    } else if (i == 1) {
        url = 'assets/map/city/' + cityMap[name] + '.json'
    }

    $.getJSON(url, function (data) {
        echarts.registerMap(name, data);
        let d = [];
        for (var i = 0; i < data.features.length; i++) {
            d.push({
                name: data.features[i].properties.name,
                value: Math.round(Math.random() * 1000)
            })
        }
        renderMap(name, d);
    });
}
