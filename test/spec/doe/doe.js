/**
 * Created by TIMYY on 2014/7/21.
 */
describe('doe',function(){
// 测试开始
    describe('.version',function(){
        it('应该返回版本号',function(){

            //改这中间的东东就能测试了，真有BUG，写成ID.version了：）
            var results = doe.version;
            var expected =  '0.1.0';

            expect(results).to.deep.eql(expected);
        });
    });
    describe('.detect，获取环境变量',function(){

        it('locale 获取地点变量',function(){

            //改这中间的东东就能测试了，真有BUG，写成ID.version了：）
            var results = doe.detect().locale;
            var expected =  'zh-CN';

            expect(results).to.deep.eql(expected);
        });

        it('os 获取操作系统',function(){

            //改这中间的东东就能测试了，真有BUG，写成ID.version了：）
            var results = doe.detect().os;
            var expected =  'win';

            expect(results).to.deep.eql(expected);
        });
    });




});