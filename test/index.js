const test = require('tap').test;
const { createSearchQuery, getAggregationArray } = require("../index");

test('smoke test', function (t) {
        var searchQuery = createSearchQuery({});
        t.equal(searchQuery, false);
        searchQuery = createSearchQuery({ searchText: "" });
        t.equal(searchQuery, false);
        searchQuery = createSearchQuery({ searchText: "test", searchFields: ['test'] });
        t.equal(searchQuery["$or"].length, 1);
        searchQuery = createSearchQuery({ searchText: "test", searchFields: ['test'], caseSensitive: true });
        t.equal(searchQuery["$or"].length, 1);

        var getAggregate = getAggregationArray();
        t.equal(getAggregate.length, 4);
        getAggregate = getAggregationArray({ project: { "test": 1 } });
        t.equal(getAggregate.length, 5);
        getAggregate = getAggregationArray({ skip: 0 }, { limit: 10 }, { project: { "test": 1 } });
        t.equal(getAggregate.length, 4);
        getAggregate = getAggregationArray({ searchText: "test", searchFields: ['test'], caseSensitive: true, skip: 0, limit: 10, project: { "test": 1 } });

        t.equal(getAggregate.length, 5);
        console.log(getAggregate);
        t.end();
});
