import getCryptoData from "./API_calls/getCryptoData.js";
import commitChart from "./Chart Generation/commitChartCombined.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import commitData from './Chart Generation/commitData.js';
import page1 from "./Report Generation/page1.js";
import page2 from "./Report Generation/page2.js";
import page3 from "./Report Generation/page3.js";
import page4 from "./Report Generation/page4.js";
import page5 from "./Report Generation/page5.js";
import page6 from "./Report Generation/page6.js";
import page7 from "./Report Generation/page7.js";
import page8 from "./Report Generation/page8.js";


async function main() {
    const bitcoinRaw = await getCryptoData("https://api.github.com/repos/bitcoin/bitcoin/stats/commit_activity");
    const ethereumRaw = await getCryptoData("https://api.github.com/repos/ethereum/go-ethereum/stats/commit_activity");
    // const polkadotRaw = await getCryptoData("https://api.github.com/repos/paritytech/polkadot/stats/commit_activity");
    const cosmosRaw = await getCryptoData("https://api.github.com/repos/cosmos/cosmos-sdk/stats/commit_activity");

    if(!bitcoinRaw || !ethereumRaw || !cosmosRaw) {
        console.log("Github API not working. Please try again after some time");
        return;
    }
    const cryptoWeekly = commitData(bitcoinRaw);

    const bitcoinActiveDevRaw = await getCryptoData("https://api.github.com/repos/bitcoin/bitcoin/stats/participation");
    const ethereumActiveDevRaw = await getCryptoData("https://api.github.com/repos/ethereum/go-ethereum/stats/participation");
    const cosmosActiveDevRaw = await getCryptoData("https://api.github.com/repos/cosmos/cosmos-sdk/stats/participation");

    var bitcoinActiveDev = {},ethereumActiveDev = {},cosmosActiveDev = {};
    for(let i = 0;i < 52;i++){
        bitcoinActiveDev[Object.keys(cryptoWeekly)[i]] = bitcoinActiveDevRaw.all[i];
        bitcoinActiveDev[Object.keys(cryptoWeekly)[i]] += bitcoinActiveDevRaw.owner[i];
    }
    for(let i = 0;i < 52;i++){
        ethereumActiveDev[Object.keys(cryptoWeekly)[i]] = ethereumActiveDevRaw.all[i];
        ethereumActiveDev[Object.keys(cryptoWeekly)[i]] += ethereumActiveDevRaw.owner[i];
    }
    for(let i = 0;i < 52;i++){
        cosmosActiveDev[Object.keys(cryptoWeekly)[i]] = cosmosActiveDevRaw.all[i];
        cosmosActiveDev[Object.keys(cryptoWeekly)[i]] += cosmosActiveDevRaw.owner[i];
    }
  
    
    // Create a document
    const doc = new PDFDocument();
    // pipes doc to output file
    doc.pipe(fs.createWriteStream(`Output_Dev_acivity_report.pdf`));
    // front page
    doc
    .moveDown(10)
    .font('fonts/inconsolata.regular.ttf')
    .fontSize(25)
    .text('Dev Activity Report on Bitcoin, Ethereum and Cosmos', {
        align: 'center',
        valign: 'center'
    })
    .moveDown(17)
    .fontSize(10)
    .text(`Generated on: ${new Date()}`,{
        align:'right'
    });
    // console.log(typeof(bitcoinActiveDev));
    // Other pages
    await page1(doc,bitcoinRaw);
    await page2(doc,ethereumRaw); 
    await page3(doc,cosmosRaw);
    await page4(doc,bitcoinRaw, ethereumRaw, cosmosRaw);
    
    await page5(doc,bitcoinActiveDev);
    await page6(doc,ethereumActiveDev);
    await page7(doc,cosmosActiveDev);
    await page8(doc,bitcoinActiveDev,ethereumActiveDev,cosmosActiveDev);

    doc.end();
}

main();

// commitChart(bitcoinMonthly,ethereumMonthly,polkadotMonthly,cosmosMonthly);
//   line_chart.toDataURI(); // Promise<String> : data:image/png;base64,iVBORw0KGgo...
//   line_chart.toBuffer(); // Promise<Buffer> : Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 ...




