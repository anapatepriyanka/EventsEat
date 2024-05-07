const { validationResult } = require("express-validator")
const MenuCart = require("../models/menuCart-model")
const menuCartCtrl = {}

menuCartCtrl.create = async(req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body = req.body
        console.log(body)
        const menuCart = new MenuCart(body)
        menuCart.userId= req.user.id
        menuCart.save()
        res.status(200).json(menuCart)
    }
    catch(err){
        console.log(err)
        res.status(500).json('Failed to Create Menu Item')
    }
}
menuCartCtrl.list = async (req, res) => {
    try {
      const menuCartItems = await MenuCart.find();
      res.json(menuCartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve menu cart items' });
    }
}
menuCartCtrl.delete = async (req, res) => {
  try {
      const deletedMenuCartItem = await MenuCart.findOneAndDelete({ _id: req.params.id });
      if (!deletedMenuCartItem) {
          return res.status(404).json({ error: 'Menu cart item not found' });
      }
      res.json({ message: 'Menu cart item deleted successfully', deletedMenuCartItem });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete menu cart item' });
  }
},
// menuCartCtrl.clear = async (req, res) => {
//   const { userId } = req.params;

//   try {
//       await MenuCart.deleteMany({ userId });
//       res.json({ message: 'Cart cleared successfully' });
//   } catch (error) {
//       res.status(500).json({ message: 'Failed to clear cart', error: error.message });
//   }
// };
module.exports = menuCartCtrl
