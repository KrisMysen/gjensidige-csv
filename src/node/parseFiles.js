
const GJENSIDIGE_DATE = 0;
const GJENSIDIGE_EXPLANATION = 2;
const GJENSIDIGE_AMOUNT_NOK = 3;

var fs = require("fs");
var readline = require("readline");
var fd = fs.openSync('outputfiles/test.csv', 'w');
fs.write(fd, "Date,Payee,Category,Memo,Outflow,Inflow\n");

fs.readdir("inputfiles", (err, files) => {
  if (err) throw err;

  for (var fileName in files) {

    var rl = readline.createInterface({
      input: fs.createReadStream("inputfiles/" + files[fileName])
    });

    rl.on("line", function (line) {
      if (line.indexOf("Dato") > -1) {
        return;
      }

      var lineParts = line.split("\t");

      var ynabDate = formatDate(lineParts[GJENSIDIGE_DATE]);
      var ynabPayee = formatPayee(lineParts[GJENSIDIGE_EXPLANATION]);
      var inflowOrOutflow = formatAmount(lineParts[GJENSIDIGE_AMOUNT_NOK]);
      var ynabLine = ynabDate + "," + ynabPayee + ",,," +  inflowOrOutflow + "\n";

      fs.write(fd, ynabLine);
      console.log(ynabLine);
    });


  }
});



function formatDate(date) {
  var dateParts = date.split(".");
  return dateParts[0] + "/" + dateParts[1] + "/" + dateParts[2];
}

function formatPayee(payee) {
  return payee.replace(/^(\d{2}.\d{2}\s)/, "");  
}

function formatAmount(amount) {
  amount = amount.replace(",", ".");
  if (Number(amount) > 0) {
    return "," + amount;
  } else {
    return amount.replace("-", "") + ",";
  }
}
