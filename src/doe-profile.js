/* *
 * DOE pipeline profile
 * @version 0.1.0
 * @Explain DOE profile ��һ��HTML5�ݶ������棬����Կ��ٷ���Ľ����ݶ�����ƺͱ༭��
 * @author Timyy
 * @email timyycn@gmail.com
 * @copyright
 */
// DOE Profile ����
// ��Ȩ����
// by timyy 2014
//
// ����JSDOC����ע
/* *
 * @class doe
 * @constructor
 * ����
 */
var doe =
{
   version : "0.1.0"
}
;

//
function  doe_feature(type)
{

   this._type = type;
   // point , line , area
   this.dataset = [];
   var myline = d3.svg.line()
   .x(function(d)
   {
      return d[0];

   }
   )
   .y(function(d)
   {
      return d[1];

   }
   )
   .interpolate("linear");
   if(typeof doe_feature._initialized == "undefined"	)
   {
      doe_feature.prototype.show = function(g)
      {
         switch(this._type)
         {
            case "point" :
               // ִ�д���� 1
               break;
            case "line" :
               // ִ�д���� 2
               g.append("path")
               .attr("d", myline(this.dataset))
               .attr("stroke", "blue")
               .attr("stroke-width", 2)
               .attr("fill", "none");
               break;
            default :
            // n �� case 1 �� case 2 ��ͬʱִ�еĴ���
         }

         alert(this._type);
      }
      doe_feature._initialized = true;
   }
}

// feature collection
var featureCollection =
{
   "layerDefinition" : null,
   "featureSet" :
   {
      "features" : [],
      "geometryType" : "esriGeometryPoint"
   }
   ,
   AddFeature : function(type)
   {
      var afeature = new doe_feature(type);
      this.featureSet.features.push(afeature);
      this.featureSet.geometryType = type;
   }
   ,
   show : function(g)
   {
      this.featureSet.features.forEach( function(item)
      {

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
doe.profile = function(name, width, height)
{
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
      "svg" : null,
      "xScale" : null,
      "yScale" : null
   }



   /* *
   * @field {Array} _dataset
   * @private
   */
   this.dataset = [];
   if(typeof this._initialized == "undefined"	)
   {
      doe.profile.prototype.init = function()
      {
         this.g.svg = d3.select(this.name)
         .append("svg")
         .attr("width", this.width)
         .attr("height", this.height);
         // �������·��
         this.g.svg.append("clipPath") // �����µ�clipPath Ԫ��
         .attr("id", "chart-area") // Ϊ��ָ��ID
         .append("rect") // ��clipPath �У�����������µ�rectԪ��
         .attr("x", this._padding) // ����rect ��λ�úʹ�С����
         .attr("y", this._padding)
         .attr("width", this.width - this._padding * 2)
         .attr("height", this.height - this._padding * 2);
      }
      doe.profile.prototype.show = function(map)
      {
         if (this.dataset.length == 0)
         {
            alert("û�����!");
         }
         else
         {

            this.xScale = d3.scale.linear()
            .domain([0, d3.max(this.dataset, function(d)
            {
               return d[0];
            }
            )])
            .range([this._padding, this.width - this._padding]);
            this.yScale = d3.scale.linear()
            .domain([0, d3.max(this.dataset, function(d)
            {
               return d[1];
            }
            )])
            .range([this.height - this._padding , this._padding]);
            // ��귴ת

            var _scaleDataset = [];
            // ���鰴X�Ĵ�С����
            this.dataset.sort(function(a, b)
            {
               return (a[0] - b[0]);
            }
            );
            // ţX��by timyy
            for (var i = 0; i < this.dataset.length; i ++ )
            {
               // ������ݳ�ϡ��������ܡ�
               var x = Math.floor( this.xScale(this.dataset[i][0]));
               var y = Math.floor(this.yScale(this.dataset[i][1]));
               if( i > 0 )
               {
                  if(x == _scaleDataset[_scaleDataset.length - 1][0] )
                  {
                     // ��ݵ�������Ҫ��Ҫ�ǿ���y����ȣ���ݳ�ϡЧ��ܲ��ֻ����x���������ͱ���˲�����width����
                     // ���ǣ�Ŀǰȡ����ȡ����ԭʼ��ݣ�Ӧ�ð�������
                     // ���ӵ�
                     // ���Ա�����2��500��000���㣬��9�롣10�����Ӧ��û�����⣬������������ص�

                     // _scaleDataset.push([x, y]);
                  }
                  else
                  {
                     _scaleDataset.push([x, y]);
                  }

               }
               else
               {
                  _scaleDataset.push([x, y]);
               }
            }
            // alert(_scaleDataset.length);

            var g = this.svg.append("g") // �����µ�g Ԫ��
            .attr("id", "paths") // ָ�����ID Ϊcircles
            .attr("clip-path", "url(#chart-area)");
            // ��Ӷ�clipPath ������
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
