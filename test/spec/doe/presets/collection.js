/**
 * Created by TIMYY on 2014/7/27.
 */
describe('doe.presets.Collection',function(){
    // 测试开始
    var p = {
        point: doe.presets.Preset('point', {
            tags: {},
            geometry: ['point']
        }),
        area: doe.presets.Preset('area', {
            tags: {},
            geometry: ['area']
        }),
        residential: doe.presets.Preset('profile', {
            tags: {
                highway: 'residential'
            },
            geometry: ['line']
        }),
        park: doe.presets.Preset('leisure/park', {
            tags: {
                leisure: 'park'
            },
            geometry: ['point', 'area']
        })
    };

    var c = doe.presets.Collection([p.point, p.area, p.residential, p.park]);
 //       n = doe.Node( { id: 'n1' }),
 //       w = doe.Way({ tags: { highway: 'residential' }}),
 //       g = doe.Graph().replace(w);

    describe("#item", function() {
        it("fetches a preset by id", function() {
            expect(c.item('highway/residential')).to.equal(p.residential);
        });
    });

});
