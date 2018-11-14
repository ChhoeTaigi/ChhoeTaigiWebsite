import { Minimongo } from '../../api/database/minimongo';

// check if only one record
let data = Minimongo.find().fetch();
if (data.length > 1) {
    Minimongo.remove({});
}
