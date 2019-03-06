
# input config
```bash
// options:
// {
//     caseSensitive: false;
//     searchFields: ["",""];
//     searchText: "";  #String
//     match: {};       
//     sort: null;      # {createdBy: -1}
//     limit: null;     # Numeric 
//     skip: null;      # Numeric 
//     project: null;   # {"test" : 1}
// }
```

# output will be 
```bash
[ { '$match': { '$or': [{test:{ '$regex': 'test' }, '$option': 'i'}] } },
      { '$sort': { createdBy: -1 } },
      { '$skip': 0 },
      { '$limit': 10 },
      { '$project': { test: 1 } } ]

```
aggregate query for mongo db

cont aggreateQuery = require('aggregare-query');


# npm test
