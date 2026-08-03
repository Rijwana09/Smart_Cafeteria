import { useCart } from "../../context/CartContext";
import { resolveImageUrl } from "../../utils/imageUrl";

function CartItem({ item }) {

  const {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-4
      flex
      flex-col
      md:flex-row
      gap-4
      "
    >
      <img
        src={resolveImageUrl(item.image)}
        alt={item.name}
        className="
        w-full
        md:w-32
        h-32
        object-cover
        rounded-lg
        "
      />

      <div className="flex-1">

        <h3 className="text-xl font-bold">
          {item.name}
        </h3>

        <p className="text-gray-500">
          ₹{item.price}
        </p>

        <div className="flex gap-3 mt-4">

          <button
            onClick={() =>
              decreaseQuantity(item._id)
            }
            className="
            px-3
            py-1
            bg-gray-200
            rounded
            "
          >
            -
          </button>

          <span>
            {item.quantity}
          </span>

          <button
            onClick={() =>
              increaseQuantity(item._id)
            }
            className="
            px-3
            py-1
            bg-gray-200
            rounded
            "
          >
            +
          </button>

        </div>
      </div>

      <div>

        <button
          onClick={() =>
            removeItem(item._id)
          }
          className="
          bg-red-500
          text-white
          px-4
          py-2
          rounded-lg
          "
        >
          Remove
        </button>

      </div>
    </div>
  );
}

export default CartItem;