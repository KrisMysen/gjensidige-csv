
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
var fd = fs.openSync('outputfiles/test.csv', 'w');

var rl = readline.createInterface({
  input: fs.createReadStream("inputfiles/Kort_Siste_Transaksjoner.csv")
});

var firstLine = true;
rl.on("line", function (line) {
  if (firstLine) {
    firstLine = false;
    fs.write(fd, "Date,Payee,Category,Memo,Outflow,Inflow\n");
    return;
  }
  var lineParts = line.split("\t");

  var ynabDate = formatDate(lineParts[GJENSIDIGE_DATE]);
  var inflowOrOutflow = formatAmount(lineParts[GJENSIDIGE_AMOUNT_NOK]);
  var ynabLine = ynabDate + "," + lineParts[GJENSIDIGE_EXPLANATION] + ",,," +  inflowOrOutflow + "\n";

  fs.write(fd, ynabLine);
  console.log(ynabLine);

  for (var part in lineParts) {
    console.log(lineParts[part]);
  }

  console.log(line);
});


function formatDate(date) {
  var dateParts = date.split(".");
  return dateParts[0] + "/" + dateParts[1] + "/" + dateParts[2];
}

function formatAmount(amount) {
  amount = amount.replace(",", ".");
  if (Number(amount) > 0) {
    return "," + amount;
  } else {
    return amount.replace("-", "") + ",";
  }
}
