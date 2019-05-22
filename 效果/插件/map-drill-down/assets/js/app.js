//地图容器
var chart = echarts.init(document.getElementById('main'));
//34个省、市、自治区的名字拼音映射数组
var provinces = {
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

//直辖市和特别行政区-只有二级地图，没有三级地图
var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
var mapdata = [];
//绘制全国地图
$.getJSON('assets/map/china.json', function (data) {
    d = [];
    for (var i = 0; i < data.features.length; i++) {
        d.push({
            name: data.features[i].properties.name,
            value: Math.round(Math.random() * 1000)
        })
    }
    mapdata = d;
    //注册地图
    echarts.registerMap('china', data);
    //绘制地图
    renderMap('china', d);
});

//地图点击事件
chart.on('click', function (params) {
    console.log(params);
    if (params.name in provinces) {
        //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
        $.getJSON('assets/map/province/' + provinces[params.name] + '.json', function (data) {
            echarts.registerMap(params.name, data);
            var d = [];
            for (var i = 0; i < data.features.length; i++) {
                d.push({
                    name: data.features[i].properties.name,
                    value: Math.round(Math.random() * 1000)
                })
            }
            renderMap(params.name, d);
        });
    } else if (params.seriesName in provinces) {
        //如果是【直辖市/特别行政区】只有二级下钻
        if (special.indexOf(params.seriesName) >= 0) {
            renderMap('china', mapdata);
        } else {
            //显示县级地图
            $.getJSON('assets/map/city/' + cityMap[params.name] + '.json', function (data) {
                echarts.registerMap(params.name, data);
                var d = [];
                for (var i = 0; i < data.features.length; i++) {
                    d.push({
                        name: data.features[i].properties.name,
                        value: Math.round(Math.random() * 1000)
                    })
                }
                renderMap(params.name, d);
            });
        }
    } else {
        renderMap('china', mapdata);
    }
});

//处理data数据
var geoCoordMap = {
    "上海": [121.48, 31.22],
    "重庆": [106.54, 29.59],
    "北京": [116.46, 39.92],
    "天津": [117.2, 39.13],
    "四川": [104.08038, 30.695528]
};
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

//初始化绘制全国地图配置
function renderMap(map, data) {
    var option = {
        backgroundColor: 'green',
        title: {
            subtext: '',
            left: 'center',
            subtextStyle: {
                color: '#000',
                fontSize: 13,
                fontWeight: 'normal'
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
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000

    };
    option.title.subtext = map;
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
