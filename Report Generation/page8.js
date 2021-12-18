import PDFDocument from 'pdfkit';
// import bitcoinCommitsChart from '../Chart Generation/bitcoinCommitsChart.js';
import commitData from '../Chart Generation/commitData.js';
import cryptoChart from '../Chart Generation/cryptoChart.js';
import devChart from '../Chart Generation/devChart.js';
import devChartCombined from '../Chart Generation/devChartCombined.js';

const utility = (weeklyData) => {
    var BitcoinAvCommits = 0;
    // const weeklyData = commitData(bitcoinRaw);
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






const page8 = async (doc,bitcoinActiveDev,ethereumActiveDev,cosmosActiveDev) => {
    doc
    .addPage()
    .font('Helvetica')
    .fontSize(20)
    .text('Comparison of Active Developers count', {
        align:'left'
    });

    // const buff = await bitcoinCommitsChart(bitcoinRaw);
    // const buff = await devChart(cosmosActiveDev,"Cosmos","Active Developers Trends","#Active Developers");
    const buff = await devChartCombined(bitcoinActiveDev,ethereumActiveDev,cosmosActiveDev);
    doc
    .moveDown(3)
    .image(buff, {
        width:500, // 500
        height:300, // 300
        align: 'left',
        valign: 'center'
      });

      var BitcoinAvCommits = utility(bitcoinActiveDev);
      var EthereumAvCommits = utility(ethereumActiveDev);
      var CosmosAvCommits = utility(cosmosActiveDev);

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
      points.push(`Among the three technologies, ${maxCommitCoin} had the highest average active developer count of ${maxCommit}`);
      points.push(`${minCommitCoin} had the least average active developer count of ${minCommit}`);

      doc
      .fontSize(18)
      .moveDown(1)
      .text("Key Points from comparison of active developers count")
      .moveDown(1)
      .fontSize(15)
      .list(points);
    

}

export default page8;