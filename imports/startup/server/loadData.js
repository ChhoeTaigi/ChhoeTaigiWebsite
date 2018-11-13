import { Minimongo } from '../../api/minimongo';

// check if only one record
let data = Minimongo.find().fetch();
if (data.length > 1) {
    Minimongo.remove({});
}
