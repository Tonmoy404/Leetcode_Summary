const { string, object } = require('yup')

const summarySchema = object().shape({
    username: string()
        .required("Enter a Username")
})

module.exports.summarySchema = summarySchema;