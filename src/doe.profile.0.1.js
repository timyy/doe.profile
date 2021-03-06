/* *
 * DOE pipeline profile
 * @version 0.1.0
 * @Explain DOE profile 是一个HTML5纵断面引擎，它可以快速方便的进行纵断面绘制和编辑。
 * @author Timyy
 * @email timyycn@gmail.com
 * @copyright
 */
// DOE Profile 代码
// 版权所有
// by timyy 2014
//
// 采用JSDOC做标注
/* *
 * @class doe
 * @constructor
 * 根类
 */
!function() {}
var doe =
    {
        "version": "0.1.0"
    }
    ;


//
function doe_feature(type) {

    this._type = type;
    // point , line , area
    this.dataset = [];
    var myline = d3.svg.line()
        .x(function (d) {
            return d[0];

        }
    )
        .y(function (d) {
            return d[1];

        }
    )
        .interpolate("linear");
    if (typeof doe_feature._initialized == "undefined") {
        doe_feature.prototype.show = function (g) {
            switch (this._type) {
                case "point" :
                    // 执行代码块 1
                    break;
                case "line" :
                    // 执行代码块 2
                    g.append("path")
                        .attr("d", myline(this.dataset))
                        .attr("stroke", "blue")
                        .attr("stroke-width", 2)
                        .attr("fill", "none");
                    break;
                default :
                // n 与 case 1 和 case 2 不同时执行的代码
            }

            alert(this._type);
        }
        doe_feature._initialized = true;
    }
}

// feature collection
var featureCollection =
    {
        "layerDefinition": null,
        "featureSet": {
            "features": [],
            "geometryType": "esriGeometryPoint"
        },
        AddFeature: function (type) {
            var afeature = new doe_feature(type);
            this.featureSet.features.push(afeature);
            this.featureSet.geometryType = type;
        },
        show: function (g) {
            this.featureSet.features.forEach(function (item) {

                    item.show(g);
                }
            );
        }
    }
    ;

/* *
 * @class doe.doe
 * @constructor
 * @param {String} name
 * @param {String} color
 */
doe.profile = function (name, width, height) {
    /* *
     * @field {String} name
     * @field {int} width
     * @field {int} height
     * @public
     */
    this.name = name;
    /* *
     * @field {int} width
     * @public
     */
    this.width = width;
    this.height = height;
    this._features = featureCollection;
    this._padding = 30;
    this.g =
    {
        "svg": null,
        "xScale": null,
        "yScale": null
    }


    /* *
     * @field {Array} _dataset
     * @private
     */
    this.dataset = [];
    if (typeof this._initialized == "undefined") {
        doe.profile.prototype.init = function () {
            this.g.svg = d3.select(this.name)
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);
            // 定义剪切路径
            this.g.svg.append("clipPath") // 创建新的clipPath 元素
                .attr("id", "chart-area") // 为它指定ID
                .append("rect") // 在clipPath 中，创建并添加新的rect元素
                .attr("x", this._padding) // 设置rect 的位置和大小……
                .attr("y", this._padding)
                .attr("width", this.width - this._padding * 2)
                .attr("height", this.height - this._padding * 2);
        }
        doe.profile.prototype.show = function (map) {
            if (this.dataset.length == 0) {
                alert("没有数据!");
            }
            else {

                this.xScale = d3.scale.linear()
                    .domain([0, d3.max(this.dataset, function (d) {
                            return d[0];
                        }
                    )])
                    .range([this._padding, this.width - this._padding]);
                this.yScale = d3.scale.linear()
                    .domain([0, d3.max(this.dataset, function (d) {
                            return d[1];
                        }
                    )])
                    .range([this.height - this._padding , this._padding]);
                // 坐标反转

                var _scaleDataset = [];
                // 数组按X的大小排序
                this.dataset.sort(function (a, b) {
                        return (a[0] - b[0]);
                    }
                );
                // 牛X，by timyy
                for (var i = 0; i < this.dataset.length; i++) {
                    // 作下数据抽稀，提高性能。
                    var x = Math.floor(this.xScale(this.dataset[i][0]));
                    var y = Math.floor(this.yScale(this.dataset[i][1]));
                    if (i > 0) {
                        if (x == _scaleDataset[_scaleDataset.length - 1][0]) {
                            // 数据单调很重要，要是考虑y的相等，数据抽稀效果很差，但只考虑x，几万个点就变成了不多于width个。
                            // 但是，目前取整是取决于原始数据，应该按照像素
                            // 不加点
                            // 测试表明，2，500，000个点，用9秒。10万个点应该没有问题，点数会少于像素点

                            // _scaleDataset.push([x, y]);
                        }
                        else {
                            _scaleDataset.push([x, y]);
                        }

                    }
                    else {
                        _scaleDataset.push([x, y]);
                    }
                }
                // alert(_scaleDataset.length);

                var g = this.svg.append("g") // 创建新的g 元素
                    .attr("id", "paths") // 指定它的ID 为circles
                    .attr("clip-path", "url(#chart-area)");
                // 添加对clipPath 的引用
                this._features.show(g);

                this.xAxis = d3.svg.axis()
                    .scale(this.xScale)
                    .orient("bottom")
                    .ticks(5);
                this.svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (this.height - this._padding) + ")")
                    .call(this.xAxis);
                this.xAxis2 = d3.svg.axis()
                    .scale(this.xScale)
                    .orient("bottom")
                    .ticks(0);
                this.svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + this._padding + " )")
                    .call(this.xAxis2);
                this.yAxis = d3.svg.axis()
                    .scale(this.yScale)
                    .orient("left")
                    .ticks(5);
                this.svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + this._padding + " ,0)")
                    .call(this.yAxis);
                this.yAxis2 = d3.svg.axis()
                    .scale(this.yScale)
                    .orient("left")
                    .ticks(0);
                this.svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + ( this.width - this._padding) + " ,0)")
                    .call(this.yAxis2);
            }
        }
    }
    this._initialized = true;

}
