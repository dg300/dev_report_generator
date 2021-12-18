import PDFDocument from 'pdfkit';
// import cosmosCommitsChart from '../Chart Generation/cosmosCommitsChart.js';
import commitData from '../Chart Generation/commitData.js';
import cryptoChart from '../Chart Generation/cryptoChart.js';
import commitChartCombined from '../Chart Generation/commitChartCombined.js';


const utility = (bitcoinRaw) => {
    var BitcoinAvCommits = 0;
    const weeklyData = commitData(bitcoinRaw);
    var week;
    for(var i = 0;i < Object.keys(weeklyData).length-1;i++){
        week = Object.keys(weeklyData)[i];
        // if(new Date(week*1000).getMonth() == new Date()) continue;
        BitcoinAvCommits += weeklyData[week];    
    }
    BitcoinAvCommits /= 51; 
    BitcoinAvCommits = BitcoinAvCommits.toFixed(1);
    return BitcoinAvCommits;
}



const page4 = async (doc,bitcoinRaw, ethereumRaw, cosmosRaw) => {
    doc
    .addPage()
    .font('Helvetica')
    .fontSize(20)
    .text('Comparison of Commit activity on all of the three repositories', {
        align:'left'
    });

    // const buff = await cosmosCommitsChart(cosmosRaw);
    // const buff = await cryptoChart(cosmosRaw,"Cosmoss");
    const buff = await commitChartCombined(bitcoinRaw, ethereumRaw, cosmosRaw);
    doc
    .moveDown(3)
    .image(buff, {
        width:500,
        height:300,
        align: 'left',
        valign: 'center'
      }) 
      var BitcoinAvCommits = utility(bitcoinRaw);
      var EthereumAvCommits = utility(ethereumRaw);
      var CosmosAvCommits = utility(cosmosRaw);

    //   console.log(BitcoinAvCommits);
      var maxCommitCoin,minCommitCoin,maxCommit,minCommit;
      if(BitcoinAvCommits > EthereumAvCommits && BitcoinAvCommits > CosmosAvCommits){
        maxCommitCoin = "Bitcoin";
        maxCommit = BitcoinAvCommits;
      }else if(EthereumAvCommits > BitcoinAvCommits && EthereumAvCommits > CosmosAvCommits){
        maxCommitCoin = "Ethereum";
        maxCommit = EthereumAvCommits;
      }else{
        maxCommitCoin = "Cosmos";
        maxCommit = CosmosAvCommits;
      }

      if(BitcoinAvCommits < EthereumAvCommits && BitcoinAvCommits < CosmosAvCommits){
        minCommitCoin = "Bitcoin";
        minCommit = BitcoinAvCommits;
      }else if(EthereumAvCommits < BitcoinAvCommits && EthereumAvCommits < CosmosAvCommits){
        minCommitCoin = "Ethereum";
        minCommit = EthereumAvCommits;
      }else{
        minCommitCoin = "Cosmos";
        minCommit = CosmosAvCommits;
      }




      var points = [];
      points.push(`Among the three technologies, ${maxCommitCoin} had the highest average weekly commit count of ${maxCommit}`);
      points.push(`${minCommitCoin} had the minimum average weekly commit count of ${minCommit}`);



      doc
      .fontSize(18)
      .moveDown(1)
      .text("Key Points from the comparison of weekly commit counts")
      .moveDown(1)
      .fontSize(15)
      .list(points);
    
}

export default page4;