const assert = require("node:assert/strict");
const test = require("node:test");
const {makeLedger, grade} = require("./grader");
const ledger = makeLedger([10000, 20000, 20000, 10000]);
test("返品月に計上", () => assert.equal(grade(ledger, 10000, 40000), "pass"));
test("総額一致でも計上月違い", () => assert.equal(grade(ledger, 0, 50000), "month"));
test("返品の引き忘れ", () => assert.equal(grade(ledger, 10000, 50000), "total"));
test("返品月が赤字の練習問題", () => assert.equal(grade(makeLedger([10000,1000,1000,1000]),10000,-7000),"pass"));
