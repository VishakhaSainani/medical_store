import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";

import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked } = useSelector((state) => state.shop);
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length) {
      if (!filteredProductsQuery.isLoading) {
        dispatch(setProducts(filteredProductsQuery.data));
      }
    }
  }, [checked, filteredProductsQuery.data, dispatch]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-200 p-4 md:mr-4 rounded-lg mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Filter by Categories</h2>
          <div className="space-y-2">
            {categories?.map((c) => (
              <div key={c._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={c._id}
                  checked={checked.includes(c._id)}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="form-checkbox h-5 w-5 text-cyan-500"
                />
                <label htmlFor={c._id} className="ml-2 text-gray-800">
                  {c.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Filter by Brands</h2>
          <div className="space-y-2">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="form-radio h-5 w-5 text-cyan-500"
                />
                <label htmlFor={brand} className="ml-2 text-gray-800">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-4 rounded-lg mt-4">
        <h2 className="text-lg font-semibold mb-2">Filter by Price</h2>
        <input
          type="text"
          placeholder="Enter Price"
          value={priceFilter}
          onChange={handlePriceChange}
          className="w-full px-3 py-2 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring focus:border-cyan-300"
        />
      </div>

      <button
        className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 transition duration-300"
        onClick={() => window.location.reload()}
      >
        Reset Filters
      </button>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        {products?.length} Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <Loader />
        ) : (
          products?.map((p) => <ProductCard key={p._id} product={p} />)
        )}
      </div>
    </div>
  );
};

export default Shop;
