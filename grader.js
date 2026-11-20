function makeLedger(amounts) {
  const [returned, first, second, third] = amounts;
  return [
    ["03-05", "A01", "売上", returned],
    ["04-02", "A02", "売上", first],
    ["04-03", "A03", "売上", second],
    ["04-04", "A04", "売上", third],
    ["04-05", "A01", "返品", returned]
  ];
}
function grade(ledger, march, april) {
  const totals = {"03": 0, "04": 0};
  for (const [date, , kind, yen] of ledger) {
    totals[date.slice(0, 2)] += kind === "返品" ? -yen : yen;
  }
  if (march === totals["03"] && april === totals["04"]) return "pass";
  if (march + april === totals["03"] + totals["04"]) return "month";
  return "total";
}
if (typeof module !== "undefined") module.exports = {makeLedger, grade};
