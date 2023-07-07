const path = require('path')
const express = require('express')
const  config = require('../index')
const cors = require('cors')

module.exports = ()=>{
    const app = express();

    app.use(express.json())
    app.set("port", process.env.PORT)

    const corsOptions = {
        Credential: true,
        origin: (origin, callback)=>{
            return callback(null, true)
        }
    }

    app.use(cors(corsOptions))
    const globalConfig =  config.getGlobalConfig();

    globalConfig.routes.forEach(function (routepath){
        console.log("oka", routepath);
        require(path.resolve(routepath))(app);
    })

    return app;
}