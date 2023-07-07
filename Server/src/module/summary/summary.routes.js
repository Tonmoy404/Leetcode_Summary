const validate = require('../core/middleware/validate')
const { summarySchema } = require('./summary.schema')
const { fetchStats, recentStats } = require('./summary.controller')

module.exports = (app)=>{
    app.route('/summary')
        .post(validate(summarySchema), fetchStats )

    app.route('/stats')
        .post(validate(summarySchema), recentStats)
}