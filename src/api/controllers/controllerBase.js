// Base class for mongodb model controller
// TODO: figure out how to dynamically update fields in updateDocument
// TODO: figure out a better way to handle the console.log(err) on the catches
// TODO: remove returning the error statements before pushing to prod


class ControllerBase {
    constructor(model) {
        this.model = model //mongodb model     
    }

    createDocument = async (req, res) => {
        const body = req.body
        if (!body) {
            return res.status(400).json({ success: false, error: "Did not recieve body data." })
        }
        const document = new this.model(body)
        try {
            await document.save()
            return res.status(201).json({ success: true, id: document._id, message: "Document created." })
        } catch (error) {
            return res.status(400).json({ success: false, error: error, message: "Failed to create Document" })
        }

    }

    updateDocument = async (req, res) => {
        // Until dynamic updates are implimented this function should be overwritten
        const body = req.body
        const id = req.params.id
        if (!body) {
            return res.status(400).json({ success: false, error: "Did not recieve body data." })
        }
        try {
            const doc = await this.model.findOne({ _id: id })
            if (!doc) {
                return res.status(404).json({ success: false, data: doc, message: "Document not found." })
            }
            // TODO: figure out how to update the model dynamically
            // doc.x = body.x
            // doc.y = body.y
            // doc.z = body.z

            try {
                // NOTE: this might need to be:
                // document = new this.document(doc)
                // document.save()
                await doc.save() // i'm pretty sure doc isn't a query object
                return res.status(200).json({ success: true, id: doc._id, message: "Document updated." })
            } catch (error) {
                return res.status(400).json({ success: false, error: error, message: "Document failed to save." })
            }
        } catch (error) {
            return res.status(400).json({ success: false, error: error, message: "Document failed to query." })
        }
        // OLD CODE: changed to prevent double queries
        // this.model.findOne({_id: req.params.id}, (err, document) => {

        //     if (err) {
        //         return res.status(404).json({err, message: "Document not found."})
        //     }

        //     // TODO: figure out how to update the model dynamically
        //     // document.x = body.x
        //     // document.y = body.y 
        //     // document.z = body.z

        //     document.save().then(() => {
        //         return res.status(200).json({success: true, id: document._id, message: "Document updated."})
        //     }).catch(error => {
        //         return res.satus(404).json({error, message: "Document not updated."})
        //     })
        // })
    }

    deleteDocument = async (req, res) => {
        const id = req.params.id
        try {
            let doc = await this.model.deleteOne({ _id: id })
            return res.status(200).json({ success: true, message: `Document: ${id} deleted.`, data: doc }) // TODO: take a look at the doc object in this scenario
        } catch (error) {
            return res.status(400).json({ success: false, message: `Failed to delete Document: ${id}`, error: error })
        }
        // await this.model.findOne({_id: req.params.id}, (err, document) => {

        //     if (err) {
        //         return res.status(400).json({success: false, error: err})
        //     }

        //     if (!docuemnt) {
        //         return res.status(404).json({success: false, error: "Document not found."})
        //     }

        //     return res.status(200).json({success: true, data: document})

        // }).catch(err => console.log(err)) 
    }


    getDocumentById = async (req, res) => {
        const id = req.params.id
        try {
            const doc = await this.model.findOne({ _id: id })
            if (!doc) {
                return res.status(404).json({ success: false, error: "Document not found." })
            }
            return res.status(200).json({ success: true, data: doc })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error })
        }
        //    await this.model.findOne({_id: req.params.id}, (err, document) =>{
        //        if (err) {
        //            return res.status(400).json({success: false, error: err})
        //        }
        //        if(!document){
        //            return res.status(404).json({success: false, error: "Document not found."})
        //        }
        //        return res.status(200).json({success: true, data: document})

        //    }).catch(err => console.log(err))
    }

    getDocuments = async (req, res) => {
        try {
            const docs = await this.model.find()
            if (!docs.length) {
                return res.status(404).json({ success: false, error: "Documents not found." })
            }
            return res.status(200).json({ success: true, data: docs })
        } catch (error) {
            return res.status(400).json({ success: false, error: error, message: "Documents failed to query." })
        }
        //    await this.model.find({}, (err, documents) => {
        //        if (err) {
        //            return res.status(400).json({success: false, error: err})
        //        }
        //        if (!documents.length) {
        //            return res.status(404).json({success: false, error: "Documents not found."})
        //        }
        //        return res.status(200).json({success: true, data: documents})

        //    }).catch(err => console.log(err))
    }
}

module.exports = ControllerBase