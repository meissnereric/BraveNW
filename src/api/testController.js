const testModel = require('./testModel')

getTestModels = async (req, res) => {
    await testModel.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!data.length) {
            return res.status(404).json({success: false, error: 'data not found'})
        }
        return res.status(200).json({success: true, data: data})
    }).catch(err => console.log(err))
}

module.exports = getTestModels