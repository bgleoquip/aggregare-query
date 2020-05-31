
// options:
// {
//     caseSensitive: false;
//     searchFields: ["",""];
//     searchText: "";
//     match: { };
//     sort: null;// {createdBy: -1}
//     limit: null;// Numeric 
//     skip: null;// Numeric 
//     project: null;// {}
// }
var _ = require('lodash/core');

var createSearchQuery = function (reqData) {
    let searchText = reqData.searchText || "";
    let searchFields = reqData.searchFields || false;
    let caseSensitive = reqData.caseSensitive || false;
    if (!searchText || searchText === "" || !searchFields || searchFields.length === 0) {
        return false;
    }
    let searchQueryArray = [];
    let searchTextArray = searchText.split(" ");
    for (let i = 0; i < searchFields.length; i++) {
        for (let j = 0; j < searchTextArray.length; j++) {
            let singleQuery = { [searchFields[i]]: { $regex: searchTextArray[j] } };
            if (caseSensitive) {
                _.extend(singleQuery, { $option: "i" });
            }
            searchQueryArray.push(singleQuery);
        }
    }
    return { $or: searchQueryArray };
};

var getAggregationArray = function (req) {
    let reqData = req || {};
    let match = reqData.match || {};
    let limit = reqData.limit || 10;
    let skip = reqData.skip || 0;
    let sort = reqData.sort || { createdAt: -1 };
    let project = reqData.project || 0;
    let aggregateArray = [];
    let searchQuery = createSearchQuery(reqData);
    match = _.extend(match, searchQuery);
    aggregateArray.push({ $match: match });
    aggregateArray.push({ $sort: sort });
    if (skip || skip === 0) {
        aggregateArray.push({ $skip: skip });
    }
    if (limit || limit === 0) {
        aggregateArray.push({ $limit: limit });
    }
    if (project) {
        aggregateArray.push({ $project: project });
    }
    return aggregateArray;
}

module.exports = {
    createSearchQuery,
    getAggregationArray
}
