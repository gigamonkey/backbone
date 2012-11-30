$(document).ready(function() {

    module("Backbone.Nested", _.extend(new Environment, {
        setup: function() {
            Environment.prototype.setup.apply(this, arguments);
        }
    }));

    test("nested data", 6, function() {
        var Model = Backbone.Model;
        var model = new Model({
            foo: 'foo',
            bar: { a: 1, b: 2, c: [ 'one', 'two', { three: 'iii' } ] }
        }, { nested: true });
        equal(model.get('foo'), 'foo');
        equal(model.get('bar.a'), '1');
        equal(model.get('bar.b'), '2');
        equal(model.get('bar.c.0'), 'one');
        equal(model.get('bar.c.1'), 'two');
        equal(model.get('bar.c.2.three'), 'iii');
    });

    test("nested data", 1, function() {
        var Model = Backbone.Model.extend();
        var model = new Model({}, { nested: true });
        model.set('foo.c.3.x.y.z.2.b', 'fred');
        equal(model.get('foo.c.3.x.y.z.2.b'), 'fred');
    });

});
