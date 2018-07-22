import { MSS110Cfg } from '../src';
import { assert, expect } from 'chai';
import 'mocha';

describe('MSS110Cfg Class', () => {
    it('promise should return status = 0', () => {
        let meross = new MSS110Cfg('10.0.42.165');
        return meross.getSettingValue('SYS_SWITCH').then(function (res) {
            assert.equal(res, '0');
        });
    });

    it('callback should return status = 0', (done: Function) => {
        let meross = new MSS110Cfg('10.0.42.165');
        meross.getSettingValue('SYS_SWITCH', function (err, res) {
            assert.equal(res, '0');
            done();
        });
    });
});