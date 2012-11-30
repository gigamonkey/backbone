$(document).ready(function() {

    module("Backbone.Nested", _.extend(new Environment, {
        setup: function() {
            Environment.prototype.setup.apply(this, arguments);
        }
    }));

    test("nested data 1", 22, function() {
        var Model = Backbone.Model.extend({ nested: true });
        var model = new Model({
            foo: 'foo',
            bar: { a: 1, b: 2, c: [ 'one', 'two', { three: 'iii' } ] }
        });
        equal(model.get('foo'), 'foo');
        equal(model.get('bar.a'), '1');
        equal(model.get('bar.b'), '2');
        equal(model.get('bar.c.0'), 'one');
        equal(model.get('bar.c.1'), 'two');
        equal(model.get('bar.c.2.three'), 'iii');
        strictEqual(model.has('foo'), true);
        strictEqual(model.has('bar.a'), true);
        strictEqual(model.has('bar.b'), true);
        strictEqual(model.has('bar.c.0'), true);
        strictEqual(model.has('bar.c.1'), true);
        strictEqual(model.has('bar.c.2.three'), true);
        strictEqual(model.has('baz'), false);
        strictEqual(model.has('baz.a'), false);
        strictEqual(model.has('foo.a'), false);
        strictEqual(model.has('bar.c.x'), false);
        strictEqual(model.has('bar.c.3'), false);
        strictEqual(model.has('bar.c.2.10'), false);
        strictEqual(model.has('bar.c.2.x'), false);
        strictEqual(model.has('bar.c.2.three.0'), false);

        // Not sure what should happen if we try to set a path that is
        //obstructed. e.g. model.set('foo.a', 10);

        model.unset('foo');
        strictEqual(model.has('foo'), false);
        model.set('foo.a', 10);
        equal(model.get('foo.a'), 10);
    });

    test("nested data from docs", 4, function() {
        var Model = Backbone.Model.extend({ nested: true });
        var model = new Model({
            foo: 1,
            bar: { baz: 2, quux: [ 3, { biff: 4 } ] }
        });
        equal(model.get('foo'), 1);
        equal(model.get('bar.baz'), 2);
        equal(model.get('bar.quux.0'), 3);
        equal(model.get('bar.quux.1.biff'), 4);
    });

    test("nested set", 2, function() {
        var Model = Backbone.Model.extend({ nested: true });
        var model = new Model({});
        model.set('foo.c.3.x.y.z.2.b', 'fred');
        equal(model.get('foo.c.3.x.y.z.2.b'), 'fred');
        deepEqual(model.get('foo.c.3.x.y.z.2'), { b: 'fred' });
    });

});
