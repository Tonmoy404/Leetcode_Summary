(()=>{
    const path = require('path')
    const config = require(path.join(process.cwd(), 'src/config'))

    config.initEnvironmentVariables();

    const app = require('./src/config/lib/app')

    app.start()
})();