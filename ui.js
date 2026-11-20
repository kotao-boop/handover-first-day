const el = id => document.getElementById(id);
let ledger = makeLedger([10000, 20000, 20000, 10000]);
function render() {
  el("rows").replaceChildren();
  for (const [date, order, kind, yen] of ledger) {
    const row = el("rows").insertRow();
    for (const value of [date, order, kind, yen.toLocaleString("ja-JP") + " 円"]) {
      row.insertCell().textContent = value;
    }
  }
}
el("answer").onsubmit = event => {
  event.preventDefault();
  const outcome = grade(ledger, el("march").valueAsNumber, el("april").valueAsNumber);
  el("feedback").textContent = {
    pass: "合格です。別の金額でもう一度試せます。",
    month: "合計は合っています。注文A01の返品を受けた日を確認して、もう一度提出してください。",
    total: "合計額に差があります。売上を足し、返品を一度だけ引いたか確認してください。"
  }[outcome];
};
el("next").onclick = () => {
  ledger = makeLedger(Array.from({length: 4}, () => (1 + Math.floor(Math.random() * 20)) * 1000));
  el("answer").reset();
  el("feedback").textContent = "新しい明細を用意しました。";
  render();
};
el("download").onclick = () => {
  const csv = [["記録日","注文","区分","金額"], ...ledger].map(row => row.join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF",csv], {type:"text/csv;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = "practice-ledger.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
render();
