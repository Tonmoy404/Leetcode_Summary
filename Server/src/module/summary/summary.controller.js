const { default: axios } = require("axios");const currentDate = new Date();
console.log(currentDate);


async function fetchStats(req, res){
    try{
        const { username } = req.body
        const API = `https://leetcode.com/graphql/`

        const query = `\n    query userProblemsSolved($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    problemsSolvedBeatsStats {\n      difficulty\n      percentage\n    }\n    submitStatsGlobal {\n      acSubmissionNum {\n        difficulty\n        count\n      }\n    }\n  }\n}\n    `
        
        const variables= { username }

        console.log("variables", variables)

        const resData = await axios.post(API, {query, variables})
        console.log(resData.data)

        res.status(200).send({okay: resData.data.data.matchedUser.submitStatsGlobal.acSubmissionNum})

    }
    catch(Err){
        console.log(Err)
        res.status(500).send("Internal Server Error");
    }
}

async function recentStats(req, res){
    try{
        
        const currentDate = new Date();
        console.log(currentDate);
        
        const { username } = req.body
        const API = `https://leetcode.com/graphql/`

        const query = `\n    query recentAcSubmissions($username: String!, $limit: Int!) {\n  recentAcSubmissionList(username: $username, limit: $limit) {\n    id\n    title\n    titleSlug\n    timestamp\n  }\n}\n`    

        const variables =  {username, limit: 100}

        const resData = await axios.post(API, { query, variables})
        const listData = resData.data.data.recentAcSubmissionList

        const arr=[];

        for(var i=1; i<=7; i++){
            const startDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-i ,0,0,0,0).getTime();
            const endDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-i ,23,59,59,59).getTime()
            
            const filteredProblems = listData.filter((item)=>{
                const submissionTime = new Date(item.timestamp * 1000).getTime();;
                if(submissionTime <= endDateTime && submissionTime >= startDateTime){
                    return true;
                }
                else return false;
            })
            arr.push({date: new Date(startDateTime).toDateString(), data: filteredProblems, cnt: filteredProblems.length});
        }

        res.status(200).send(arr);
        
    }
    catch(Err){
        console.log(Err)
        res.status(500).send("Internal Server Error")               
    }
}


module.exports.fetchStats = fetchStats
module.exports.recentStats = recentStats