plays =
    {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"},
}

invoices =
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
        ]
    }

function statement (invoices, plays){
    let result = `Statement for ${invoices.customer}\n`
    for (let perf of invoices.performances) {
        result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result
}

function totalAmount(){
    let result = 0;
    for (let perf of invoices.performances) {
        result += amountFor(perf);
    }
    return result
}

function totalVolumeCredits() {
    let volumeCredits = 0
        for (let perf of invoices.performances) {
        volumeCredits = volumeCreditsFor(perf);
    }
}

function usd(aNumber){
    return new Intl.NumberFormat("en-US",
        {style: "currency", currency: 'USD',
        minimumFractionDigits: 2}).format(aNumber/100);
}

function volumeCreditsFor(perf){
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ('comedy' === playFor(perf).type) result += Math.floor(perf.audience / 5);
    return result;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function amountFor(aPerformance){
    let result = 0;
    switch (playFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30){
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20){
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
}

statement(invoices, plays)

// output
// Statement for BigCo
//   Hamlet: $650.00 (55 seats)
//   As You Like It: $580.00 (35 seats)
//   Othello: $500.00 (40 seats)
// Amount owed is $1,730.00
// You earned 47 credits