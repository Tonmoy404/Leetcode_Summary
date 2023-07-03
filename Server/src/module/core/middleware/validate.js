module.exports = (schema)=>{
    return (req, res, next)=>{
        schema.validate(req.body, { abortEarly: false})
            .then(()=>{
                next()
            })
            .catch((Err)=>{
                const errorMsg = {
                    path : Err.inner[0].path,
                    message : Err.inner[0].message
                }

                return res.status(200).send(errorMsg)
            })
    }
}