import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[calc(50%-2rem)] md:w-[calc(33.333333%-2rem)] lg:w-[calc(25%-2rem)] xl:w-[calc(20%-2rem)] mb-8 mx-1 sm:mx-4 md:mx-2 lg:mx-1 p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-lg font-semibold text-gray-800">
            {product.name}
            <span className="bg-cyan-200 text-cyan-800 text-sm font-medium px-3.5 py-1.5 rounded-full dark:bg-cyan-900 dark:text-cyan-900">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
