import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="max-w-screen-xl mx-auto">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="px-4">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />

                <div className="mt-4 flex flex-col lg:flex-row justify-between">
                  <div className="lg:w-1/2">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-800">
                      {name}
                    </h2>
                    <p className="text-lg lg:text-xl font-semibold text-gray-600">
                      $ {price}
                    </p>
                    <p className="text-lg lg:text-xl text-gray-700 mt-2">
                      {description.substring(0, 170)} ...
                    </p>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between w-full lg:w-1/2 mt-4 lg:mt-0">
                    <div className="one mr-4 lg:w-1/2">
                      <h1 className="text-lg lg:text-xl font-semibold flex items-center mb-4">
                        <FaStore className="mr-2 text-black" /> Brand: {brand}
                      </h1>
                      <h1 className="text-lg lg:text-xl font-semibold flex items-center mb-4">
                        <FaClock className="mr-2 text-black" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="text-lg lg:text-xl font-semibold flex items-center mb-4">
                        <FaStar className="mr-2 text-black" /> Reviews:{" "}
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two lg:w-1/2">
                      <h1 className="text-lg lg:text-xl font-semibold flex items-center mb-4">
                        <FaStar className="mr-2 text-black" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="text-lg lg:text-xl font-semibold flex items-center mb-4">
                        <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="text-lg lg:text-xl font-semibold flex items-center mb-4">
                        <FaBox className="mr-2 text-black" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
