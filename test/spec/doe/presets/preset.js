/**
 * Created by TIMYY on 2014/7/27.
 */
//TODO 这是单类。 preset 应该是layer类。
//
describe('doe.presets.Preset', function() {
    it("has optional fields", function() {
        var preset =doe.presets.Preset('test', {});
        expect(preset.fields).to.eql([]);
    });
    });
