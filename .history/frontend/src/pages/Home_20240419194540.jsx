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
            <h1 className="text-3xl font-bold mt-8 mb-4 text-center sm:text-left">
              Special Products
            </h1>
            <div className="flex justify-center sm:justify-between items-center mb-8">
              <Link
                to="/shop"
                className="bg-cyan-600 text-white font-bold rounded-full py-2 px-6 sm:px-8 hover:bg-cyan-700 transition duration-300"
              >
                Shop
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.products.map((product) => (
                <div key={product._id}>
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
