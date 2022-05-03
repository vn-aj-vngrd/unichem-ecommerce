import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import orderReducer from "../features/orders/orderSlice";
import couponReducer from "../features/coupons/couponSlice";
import promoReducer from "../features/promos/promoSlice";
import reportReducer from "../features/reports/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    reviews: reviewReducer,
    orders: orderReducer,
    coupons: couponReducer,
    promos: promoReducer,
    reports: reportReducer,
  },
});
