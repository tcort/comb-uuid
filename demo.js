'use strict';

const CombUUID = require('.');

// create a new UUID
const uuid = CombUUID.encode();

// decode an existing UUID
const obj = CombUUID.decode(uuid);

console.log(obj);

