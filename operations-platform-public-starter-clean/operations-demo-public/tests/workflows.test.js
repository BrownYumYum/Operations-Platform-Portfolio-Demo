import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceOrder,summarize} from '../src/workflows.js';
test('order progresses from quoted to approved',()=>assert.equal(advanceOrder({stage:'quoted',quantity:1,stock:1}).stage,'approved'));
test('insufficient stock prevents fulfillment',()=>{const result=advanceOrder({stage:'approved',quantity:9,stock:2});assert.equal(result.stage,'approved');assert.match(result.error,/Insufficient/)});
test('completed orders remain completed',()=>assert.equal(advanceOrder({stage:'completed',quantity:1,stock:1}).stage,'completed'));
test('summarization returns counts',()=>assert.deepEqual(summarize([{stage:'approved',stock:0,quantity:1}]),{total:1,ready:1,inProgress:0,exceptions:1}));
