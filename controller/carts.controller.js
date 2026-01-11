import Cart from "../../E-Commerce-Backend-RESTful-API-Project/model/carts.model.js";


//   GET CART (Get logged-in user's cart):
 
 const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: null,
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD TO CART:-
 const addToCart = async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    const totalItemPrice = price * quantity;

    // If cart does not exist, create new cart
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [
          {
            product: productId,
            name,
            price,
            quantity,
            totalItemPrice,
          },
        ],
        totalQuantity: quantity,
        totalPrice: totalItemPrice,
      });
    } else {
      // If cart exists
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Product already exists in cart
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].totalItemPrice += totalItemPrice;
      } else {
        // New product
        cart.items.push({
          product: productId,
          name,
          price,
          quantity,
          totalItemPrice,
        });
      }

      cart.totalQuantity += quantity;
      cart.totalPrice += totalItemPrice;

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  UPDATE CART ITEM QUANTITY:-
 const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params; // cart item id

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update totals
    cart.totalQuantity += quantity - item.quantity;
    cart.totalPrice += (item.price * quantity) - item.totalItemPrice;

    item.quantity = quantity;
    item.totalItemPrice = item.price * quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//  REMOVE ITEM FROM CART:-
 
 const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    cart.totalQuantity -= item.quantity;
    cart.totalPrice -= item.totalItemPrice;

    item.remove();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  CLEAR ALL CART:-
 const clearAllCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export{
getCart,addToCart,updateCartItem,removeCartItem,clearAllCart
}