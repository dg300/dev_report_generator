import PDFDocument from 'pdfkit';
// import cosmosCommitsChart from '../Chart Generation/cosmosCommitsChart.js';
import commitData from '../Chart Generation/commitData.js';
import cryptoChart from '../Chart Generation/cryptoChart.js';


const page3 = async (doc,cosmosRaw) => {
    doc
    .addPage()
    .font('Helvetica')
    .fontSize(20)
    .text('Cosmos Weekly Commit trends on Github', {
        align:'left'
    });

    // const buff = await cosmosCommitsChart(cosmosRaw);
    const buff = await cryptoChart(cosmosRaw,"Cosmos","Weekly Commit Data trends","#commits");
    doc
    .moveDown(3)
    .image(buff, {
        width:500,
        height:300,
        align: 'left',
        valign: 'center'
      })

      
    const weeklyData = commitData(cosmosRaw);
    var maxCommits = 0,minCommits = Number.MAX_VALUE;
    var maxCommitWeek,minCommitWeek;
    var week;
    var avCommits = 0;
    for(var i = 0;i < Object.keys(weeklyData).length-1;i++){
        week = Object.keys(weeklyData)[i];
        // if(new Date(week*1000).getM == new Date()) continue;
        avCommits += weeklyData[week];
        if(weeklyData[week] > maxCommits){
            maxCommitWeek = week;
            maxCommits = weeklyData[week];
        }
        if(weeklyData[week] < minCommits){
            minCommitWeek = week;
            minCommits = weeklyData[week];
        }
    }

    avCommits /= 51;
    avCommits = avCommits.toFixed(1);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    const points = [];
    points.push(`The maximum weekly commits of ${maxCommits} commits per week were recorded in the week of ${new Date(maxCommitWeek*1000).toLocaleDateString("en-US", options)}`);
    points.push(`The week of ${new Date(minCommitWeek*1000).toLocaleDateString("en-US", options)} has the minimum weekly commits of ${minCommits} commits per week `);
    points.push(`The Average weekly count for the last year was ${avCommits}`);
    doc
    .fontSize(18)
    .moveDown(1)
    .text("Key Points from Cosmos Commit trends for last 12 months")
    .moveDown(1)
    .fontSize(15)
    .list(points);
}


export default page3;
