import { Data } from '../../api/data';

// check if only one record
let data = Data.find().fetch();
if (data.length > 1) {
    Data.remove({});
}

// check if folder exists
data = Data.findOne({});
if (data === undefined) {
    Data.insert({
        folder: '20180803-024253',
    });
}
