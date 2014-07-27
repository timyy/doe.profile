/**
 * Created by TIMYY on 2014/7/16.
 */
!function() {
    var doe = {
        version: "0.1"
    };

    //
    function point(ax,ay)
    {
        var _this=this; //把this保存下来，以后用_this代替this，这样就不会被this弄晕了
        var x=0;
        var y=0;
        _this.gx=0;
        _this.gy=0;
        var init = function()
        {
            x=ax;//访问私有属性，直接写变量名即可
            y=ay;
            _this.gx=ax;//访问公有属性，需要在变量名前加上this.
            _this.gy=ay;
        };

        init();
    }
    function line()
    {
        var _this=this; //把this保存下来，以后用_this代替this，这样就不会被this弄晕了
        var _points = [];
        var init = function()
        {
            x=ax;//访问私有属性，直接写变量名即可
            y=ay;
            _this.gx=ax;//访问公有属性，需要在变量名前加上this.
            _this.gy=ay;
        };

        init();
    }
    function g()
    {

    }
//创建一个站点的构造函数，name与url是其参数
    function Site(name, url)
    {
        this.url = url;
        this.name = name;
    }

//为Site增加一个方法，用于显示网址
    Site.prototype.show = function()
    {
        return this.name+"的网址为："+this.url;
    };

//创建一个站点集合构造函数，sites是其参数
    function Sites(sites)
    {
        this.sites = sites;
    }

//为Sites增加一个方法，用于显示网址
    Sites.prototype.show = function()
    {
        var retstr = "";
        for(var i=0;i<this.sites.length;i++)
        {
            retstr+=this.sites[i].show()+"<br />";
        }
        return retstr;
    };

//新建一个站点集合，包括梦之都，百度，谷歌
    var mySites = new Sites([new Site("dream du", "www.dream du.com"), new Site("baidu", "www.baidu.com"), new Site("google", "www.google.com")]);

//打印站点网址
    document.write(mySites.show());

}();
