import { useSelector } from "react-redux";

const CartCount = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.length

  return (
    <div className="absolute left-4 top-0">
      {cartCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-orange-500 rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartCount;
