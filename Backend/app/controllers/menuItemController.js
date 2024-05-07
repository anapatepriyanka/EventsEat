const { body } = require('express-validator');
const MenuItem = require('../models/menuItem-model')
// const {validationResult} = require('express-validator')
const menuItemCtrl = {}

menuItemCtrl.create = async (req, res) => {
    // const errors = validationResult(req)
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({errors:errors.array()})
    // }
    console.log(req.file)
    try {
        const body = req.body
        const menuItem = new MenuItem(body)
        menuItem.catererId = req.user.id;

        const image = req.file;
        const catererId = req.user.id;

        // const image = req.file
        menuItem.itemImage = image.path
        console.log(req)
        await menuItem.save()
        res.status(201).json(menuItem)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err.message)
    }
}
module.exports = menuItemCtrl







// // const {validationResult} = require('express-validator')
// const menuItemCtrl = {}

// menuItemCtrl.create = async(req, res) => {
//     // const errors = validationResult(req)
//     // if(!errors.isEmpty()) {
//     //     return res.status(400).json({errors:errors.array()})
//     // }
//     try{
//         const {catererId, name, itemType, itemImage} = req.body
//         console.log(req.images)
//         const menuItem = new MenuItem({
//             catererId,
//             name,
//             itemType,
//             itemImage
//         })
//         await menuItem.save()
//         res.status(201).json('successfully updated')
//     }
//     catch(err){
//         console.log(err)
//         res.status(400).json(err.message)
//     }
// }
// module.exports = menuItemCtrl


// const MenuItem = require('../models/menuItem-model')
// // const {validationResult} = require('express-validator')
// const menuItemCtrl = {}

// menuItemCtrl.create = async(req, res) => {
//     // const errors = validationResult(req)
//     // if(!errors.isEmpty()) {
//     //     return res.status(400).json({errors:errors.array()})
//     // }
//     try{
//         const body = req.body
//         // console.log(req.name)
//         // catererId= req.user._id
//         const menuItem = new MenuItem(body)
//         await menuItem.save()
//         res.status(201).json('successfully uploaded')
//     }
//     catch(err){
//         console.log(err)
//         res.status(400).json(err.message)
//     }
// }
// module.exports = menuItemCtrl