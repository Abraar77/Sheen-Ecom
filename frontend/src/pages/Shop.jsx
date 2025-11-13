import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery, useAllProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
  setSearchedProducts
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import SearchProduct from "./Products/SearchProduct";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const { data: allProducts, isLoading, error } = useAllProductsQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate()


  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

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

  // Add "All Brands" option to uniqueBrands
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
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };



  const handleSearch = () => {
    if (!search.trim()) {
      window.location.reload();
      return;
    }
  
    const searched = allProducts
      ?.map((p) => {
        const name = p.name.toLowerCase();
        const term = search.toLowerCase();
  
        let score = 0;
  
        if (name === term) score = 100;
        else if (name.startsWith(term)) score = 80;
        else if (name.includes(term)) score = 50;
  
        const index = name.indexOf(term);
        if (index >= 0) score += Math.max(20 - index, 1);
  
        return { ...p, score };
      })
      .filter((p) => p.score >=60)
      .sort((a, b) => b.score - a.score);
  
    dispatch(setSearchedProducts(searched));
    navigate("/search");
  };


  return (
    <>
      <div className="container mx-auto">
        <div className=" ml-20 text-white flex justify-center items-center ">
          <input
            type="text"
            placeholder="search for the products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-[20rem] border rounded h-10 px-4 bg-black text-white"
          />
          <button
            onClick={handleSearch}

            className="cursor-pointer ml-3 w-[7rem] h-10 inline-flex items-center justify-center bg-pink-700 rounded-lg hover:bg-pink-900"
          >
            Search 🔍
          </button>

        </div>
        <div className="flex md:flex-row ">
          <div className="bg-[#151515] p-3 mt-2 mb-2 pl-10 ml-10">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Categories
            </h2>

            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"

                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />


                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Brands
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-enter mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filer by Price
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className=" text-white w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;