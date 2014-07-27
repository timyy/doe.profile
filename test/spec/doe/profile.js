/**
 * Created by TIMYY on 2014/7/25.
 */
describe('doe.profile',function(){
    // 测试开始
    describe('.version',function(){
        it('应该返回版本号',function(){

            //改这中间的东东就能测试了，真有BUG，写成ID.version了：）
            var results = doe.version;
            var expected =  '0.1.0';

            expect(results).to.deep.eql(expected);
        });
    });
});
