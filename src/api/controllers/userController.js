// TODO: remove errors from response objects before pushing to prod

const ControllerBase = require("./controllerBase")
const UserModel = require("../models/userModel")

class UserController extends ControllerBase {
    constructor(model) {
        super(model)
        this.getDocuments.bind(this)
    }

    updateDocument = async (req, res) => {
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
            doc.email = body.email

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
    }

    getUserByEmail = async (req, res) => {
        const userEmail = req.params.email
        try {
            const data = await this.model.findOne({email: userEmail})
            if (!data) {
                return res.status(404).json({success: false, data: data})
            }
            return res.status(200).json({success: true, data: data})
        } catch (error) {
            console.log(error)
            return res.status(400).json({success: false, error: error})
        }  
    }

    getOrCreateUserByEmail = async (req, res) => {
        const userEmail = req.params.email
        try {
            const data = await this.model.findOne({email: userEmail})
            if (!data) {
                const newUser = new this.model({email: userEmail})
                // NOTE: calling this save caused it to save twice in DB
                // await newUser.save() 
                console.log("new user created")
                return await this.getUserByEmail(req, res)
            }
            return res.status(200).json({success: true, data: data})
        } catch (error) {
            return res.status(400).json({success: false, error: error})
        }
    }

    t = async (req, res) => {
        const x = await this.model.find()
        return res.status(200).json({success: true, data: x})
    }
    tr = async(req, res) => {
        // getUser = () => {}
        try {
            const x = await this.model.findOne({email: req.params.email})
            console.log(x)
            return res.status(200).json({success: true, data: x})
         } catch (error) {
            console.log(error)
            return res.status()
         }
        
        // await this.model.findOne({email: req.params.email}, (err, document) => {
        //     console.log(document)
        // }).catch(err => console.log(err))
        
    }

}


// updateDocument.bind(UserController)
// getUserByEmail.bind(UserController)
// UserController.updateDocument = updateDocument
// UserController.getUserByEmail = getUserByEmail

module.exports = new UserController(UserModel)