import pg from './pg';

Meteor.methods({
    'search'(params) {
        if (Meteor.isServer) {
            const cmd = pg.select('*');
            for (key in params) {
                cmd.andWhere(key, 'like', params[key])
            }
            cmd.from('TaibunHoabunSoanntengSutian');
            //return cmd;
            return cmd.limit(500);
        }
    }
});