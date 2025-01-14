const Cart = require("../models/CartModel");
const Wishlist = require("../models/WishListModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// Add to wishlist
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const {
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
  } = req.body;
  const wishList = await Wishlist.create({
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
  });

  res.status(200).json({
    success: true,
    wishList,
  });
});

// get wishlistData Data
exports.getWishlistData = catchAsyncErrors(async (req, res, next) => {
  const wishlistData = await Wishlist.find({ userId: req.user.id });

  res.status(200).json({
    success: true,
    wishlistData,
  });
});

// remove wishlistData
exports.removeWishlistData = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const wishlistData = await Wishlist.findOne({ productId });
  if (!wishlistData) {
    return next(new ErrorHandler("Items is not found with this id", 404));
  }

  await wishlistData.remove();

  res.status(200).json({
    success: true,
    message: "Item removed from wishlist",
  });
});

// add To Cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const {
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
  } = req.body;
  const cart = await Cart.create({
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
  });

  res.status(200).json({
    success: true,
    cart,
  });
});

// get Cart Data
exports.getCartData = catchAsyncErrors(async (req, res, next) => {
  const cartData = await Cart.find({ userId: req.user.id });
  res.status(200).json({
    success: true,
    cartData,
  });
});

// remove Cart Data
exports.removeCartData = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const cartData = await Cart.findOne({ productId });

  if (!cartData) {
    return next(new ErrorHandler("Items is not found with this id", 404));
  }

  await cartData.remove();

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
  });
});
