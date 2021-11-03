// Base class for mongodb model controller
// TODO: figure out how to dynamically update fields in updateDocument
// TODO: figure out a better way to handle the console.log(err) on the catches


class ControllerBase {
    constructor(model) {
        this.model = model //mongodb model
        // this.createDocument.bind(this)
        // this.updateDocument.bind(this)
        // this.getDocuments.bind(this)      
    }

    createDocument = async (req, res) => {
        const body = req.body

        if (!body) {
            return res.status(400).json({success: false, error: "Did not recieve body data."}) 
        }

        const document = new this.model(body)
        
        document.save().then(() => {
            return res.status(201).json({success: true, id: document._id, message: "Document created."})
        }).catch(error => {
            return res.status(400).json({error, message: "Failed to create Document."})
        })
   }

    updateDocument = async (req, res) => {
        // Until dynamic updates are implimented this function should be overwritten
        const body = req.body

        if(!body){
            return res.status(400).json({success: false, error: "Did not recieve body data."})
        }

        this.model.findOne({_id: req.params.id}, (err, document) => {
            
            if (err) {
                return res.status(404).json({err, message: "Document not found."})
            }

            // TODO: figure out how to update the model dynamically
            // document.x = body.x
            // document.y = body.y 
            // document.z = body.z

            document.save().then(() => {
                return res.status(200).json({success: true, id: document._id, message: "Document updated."})
            }).catch(error => {
                return res.satus(404).json({error, message: "Document not updated."})
            })
        })
    }

    deleteDocument = async (req, res) => {
        await this.model.findOne({_id: req.params.id}, (err, document) => {
            
            if (err) {
                return res.status(400).json({success: false, error: err})
            }

            if (!docuemnt) {
                return res.status(404).json({success: false, error: "Document not found."})
            }

            return res.status(200).json({success: true, data: document})
                   .catch(err => console.log(err)) 
        })
    }


   getDocumentById = async (req, res) => {
       await this.model.findOne({_id: req.params.id}, (err, document) =>{
           if (err) {
               return res.status(400).json({success: false, error: err})
           }
           if(!document){
               return res.status(404).json({success: false, error: "Document not found."})
           }
           return res.status(200).json({success: true, data: document})
                  .catch(err => console.log(err))
       })
   }

    getDocuments = async (req, res) => {
       await this.model.find({}, (err, documents) => {
           if (err) {
               return res.status(400).json({success: false, error: err})
           }
           if (!documents.length) {
               return res.status(404).json({success: false, error: "Documents not found."})
           }
           return res.status(200).json({success: true, data: documents})
                  .catch(err => console.log(err))
       })
   }
}

module.exports = ControllerBase