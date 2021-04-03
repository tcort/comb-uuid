# comb-uuid

Implements COMB UUIDs (UUID v4 Variant B) which sort to chronological order.

## Example

```
'use strict';

const CombUUID = require('comb-uuid');

// create a new UUID
const uuid = CombUUID.encode();

// decode an existing UUID
const obj = CombUUID.decode(uuid);

// { version: '4',
//   variant: 'b',
//   timestamp: 161745940159400,
//   timestamp_js: 2021-04-03T14:16:41.594Z,
//   random: '6f842887a4866c60fd' }

```
