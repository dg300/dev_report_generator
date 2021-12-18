const commitData = (weeksArr) => {
    var weeklyCommits = {};
    var currDate, prevDate;
    weeksArr.forEach(weekData => {
        weeklyCommits[weekData.week] = weekData.total;
        // console.log(author.weeks[0]);
        // var i = author.weeks.length - 1;
        // for (var month = 12; month >= 1;) {
        //     console.log((author.weeks[i]).w);
        //     currDate = new Date((author.weeks[i]).w * 1000);
        //     var oneMonthData = 0;
        //     while (1) {
        //         if(month < 1) break;
        //         // if (i < author.weeks.length - 80) break;
        //         prevDate = new Date((author.weeks[i]).w * 1000);
        //         if (prevDate.getMonth() != currDate.getMonth()) {
    
        //             break;
        //         }
        //         else {
        //             oneMonthData += (author.weeks[i]).c;
        //             // console.log("break");
        //         }
        //         i--;
        //     }
        //     monthlyCommits[month-1] += oneMonthData;
        //     month--;
        // }
    });
    
    return weeklyCommits;
}


export default commitData;