'use strict';

const crypto = require('crypto');

class CombUUID {

    static encode(now = new Date()) {

        if (!(now instanceof Date)) {
            now = new Date(now);
        }

        // timestamp
        const timestamp_js = now.getTime();
        const timestamp_bin = timestamp_js * 100;
        const timestamp_hex = timestamp_bin.toString(16);
        const ts1 = timestamp_hex.substring(0, 8);
        const ts2 = timestamp_hex.substring(8, 13);

        // version
        const version = '4';
        const variant = 'b';

        // random
        const bytes = Buffer.alloc(18);
        crypto.randomFillSync(bytes);
        const bytes_hex = bytes.toString('hex');
        const r1 = bytes_hex.substring(0, 3);
        const r2 = bytes_hex.substring(3, 6);
        const r3 = bytes_hex.substring(6, 18);

        return `${ts1}-${ts2}-${version}${r1}-${variant}${r2}-${r3}`;
    }

    static decode(uuid) {

        const uuid_hex = `${uuid}`.toLowerCase().replace(/[^0-9a-f]/g, ''); // string all non-hex characters
        if (uuid_hex.length !== 32) {
            throw new Error('Invalid UUID not length 32 when non-hex characters removed');
        }

        // timestamp
        const timestamp_hex = uuid_hex.substring(0, 12);
        const timestamp = parseInt(timestamp_hex, 16);
        const timestamp_ms = timestamp / 100;
        const timestamp_js = new Date(timestamp_ms);

        // version
        const version = uuid_hex.substring(12, 13);
        const variant = uuid_hex.substring(16, 17);

        // random
        const random = `${uuid_hex.substring(13,16)}${uuid_hex.substring(17)}`;

        return {
            version,
            variant,
            timestamp,
            timestamp_js,
            random,
        };

    }
}

module.exports = CombUUID;

