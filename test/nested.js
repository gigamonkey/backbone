$(document).ready(function() {

    module("Backbone.Nested", _.extend(new Environment, {
        setup: function() {
            Environment.prototype.setup.apply(this, arguments);
        }
    }));

    test("nested data 1", 6, function() {
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

    test("nested data from docs", 4, function() {
        var Model = Backbone.Model;
        var model = new Model({
            foo: 1,
            bar: { baz: 2, quux: [ 3, { biff: 4 } ] }
        }, { nested: true });
        equal(model.get('foo'), 1);
        equal(model.get('bar.baz'), 2);
        equal(model.get('bar.quux.0'), 3);
        equal(model.get('bar.quux.1.biff'), 4);
    });

    test("nested data", 1, function() {
        var Model = Backbone.Model.extend();
        var model = new Model({}, { nested: true });
        model.set('foo.c.3.x.y.z.2.b', 'fred');
        equal(model.get('foo.c.3.x.y.z.2.b'), 'fred');
    });

});
