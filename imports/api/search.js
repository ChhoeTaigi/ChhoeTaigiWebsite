import pg from './pg';

Meteor.methods({
    'search'(params) {
        if (Meteor.isServer) {
            const cmd = pg.select('*');
            for (key in params) {
                cmd.orWhere(key, 'like', params[key])
            }
            cmd.from('TaibunHoabunSoanntengSutian');
            return cmd.limit(10);
        }
    }
});