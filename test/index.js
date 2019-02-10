const test = require('tap').test;
const aggregateQuery = require("../index");

test('smoke test', function (t) {
        const noSearch = aggregateQuery.createSearchQuery({});
        console.log(noSearch)
        t.is(false,false);
        t.end();
});
