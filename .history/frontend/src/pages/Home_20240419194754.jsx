import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mt-8 mb-6 text-center sm:text-left">
              Special Products
            </h1>
            <div className="flex justify-center sm:justify-end mb-6">
              <Link
                to="/shop"
                className="bg-cyan-600 text-white font-bold rounded-full py-3 px-8 sm:px-10 hover:bg-cyan-700 transition duration-300"
              >
                Shop Now
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.products.map((product) => (
                <div key={product._id} className="flex justify-center">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
