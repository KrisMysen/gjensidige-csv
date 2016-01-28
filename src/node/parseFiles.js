
const GJENSIDIGE_DATE = 0;
const GJENSIDIGE_EXPLANATION = 1;
const GJENSIDIGE_CURRENCY_AMOUNT = 2;
const GJENSIDIGE_CURRENCY = 3;
const GJENSIDIGE_RATE = 4;
const GJENSIDIGE_AMOUNT_NOK = 5;

const YNAB_DATE = 0;
const YNAB_PAYEE = 1;
const YNAB_CATEGORY = 2;
const YNAB_MEMO = 3;
const YNAB_OUTFLOW = 4;
const YNAB_INFLOW = 5;

var fs = require("fs");
var readline = require("readline");

var rl = readline.createInterface({
  input: fs.createReadStream("inputfiles/Kort_Siste_Transaksjoner.csv")
});

rl.on("line", function (line) {

  var lineParts = line.split("\t");

  for (var part in lineParts) {
    console.log(lineParts[part]);
  }
  debugger;
  console.log(line);
});
