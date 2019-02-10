const test = require('tap').test;
const {createSearchQuery} = require("../index");

test('smoke test', function (t) {
        var noSearch = createSearchQuery({});
        console.log(noSearch)
        t.is(noSearch,false);
        noSearch = createSearchQuery({searchText=""});
        console.log(noSearch)
        t.end();
});
