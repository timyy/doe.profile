/**
 * Created by TIMYY on 2014/7/28.
 */
doe.presets.Collection = function(collection) {
    var presets = {
        collection: collection,

        item: function(id) {
            return _.find(collection, function(d) {
                return d.id === id;
            });
        }
    };

    return presets;
}