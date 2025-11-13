import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { setSearchedProducts } from "../../redux/features/shop/shopSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchedProducts = useSelector(
        (state) => state.shop.searchedProducts
    );

    const [search, setSearch] = useState("");

    const { data: allProducts, isLoading, error } = useAllProductsQuery();


  const handleSearch = () => {
    if (!search.trim()) {
      navigate("/shop");
      return;
    }
  
    const searched = allProducts?.map((p) => {
        const name = p.name.toLowerCase();
        const term = search.toLowerCase();
  
        let score = 0;
  
        if (name === term) score = 100;
        else if(name.startsWith(term)) score = 80;
        else if (name.includes(term)) score = 50;
  
        const index = name.indexOf(term);
        if (index >= 0) score += Math.max(20 - index, 1);
  
        return { ...p, score };
      })
      .filter((p) => p.score >=65)
      .sort((a, b) => b.score - a.score);
  
    dispatch(setSearchedProducts(searched));
    navigate("/search");
  };
  

    return (
        <div className="p-10 text-white">
            <div className="flex justify-center items-center mb-6">
                <input
                    type="text"
                    placeholder="search for the products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-[20rem] border rounded h-10 px-4 bg-black text-white"
                />
                <button
                    onClick={handleSearch}
                    className=" cursor-pointer ml-3 w-[7rem] h-10 inline-flex items-center justify-center bg-pink-700 rounded-lg hover:bg-pink-900"
                >
                    Search 🔍
                </button>
            </div>

            {isLoading ? (
                <div>Loading</div>
            ) : error ? (
                <div>{error?.message}</div>
            ) : (
                <>
                    <h1 className="text-2xl mb-5 ml-10">Search Results</h1>

                    {searchedProducts?.length === 0 ? (
                        <p className="ml-13">No products found.</p>
                    ) : (
                        <div className="flex flex-wrap ml-9">
                            {searchedProducts.map((p) => (
                                <div key={p._id} className="p-3">
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchProduct;
