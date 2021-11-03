const ControllerBase = require("./controllerBase")
const UserModel = require("../models/userModel")
const { FaThemeisle } = require("react-icons/fa")

// const UserController = new ControllerBase(UserModel)

class UserController extends ControllerBase {
    constructor(model){
        super(model)
        this.getDocuments.bind(this)
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
       
            // update fields
            document.email = body.email
            document.charName = body.charName
    
            document.save().then(() => {
                return res.status(200).json({success: true, id: document._id, message: "Document updated."})
            }).catch(error => {
                return res.satus(404).json({error, message: "Document not updated."})
            })
        })
    }
    
    getUserByEmail = async (req, res) => {
            await this.model.findOne({email: req.params.email}, (err, document) =>{
                if (err) {
                    return res.status(400).json({success: false, error: err})
                }
                if(!document){
                    return res.status(200).json({success: false, error: "Document not found."})
                }
                return res.status(200).json({success: true, data: document})
                       //.catch(err => console.log(err))
            })
    }

}


// updateDocument.bind(UserController)
// getUserByEmail.bind(UserController)
// UserController.updateDocument = updateDocument
// UserController.getUserByEmail = getUserByEmail

module.exports = new UserController(UserModel)