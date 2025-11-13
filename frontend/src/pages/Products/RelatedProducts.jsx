import { useFetchProductsByCategoryQuery } from "../../redux/api/productApiSlice";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Loader from "../../components/Loader";

const RelatedProducts = ({ category, productId }) => {
  const { data: products, isLoading, error } = useFetchProductsByCategoryQuery(category?._id);

  // Filter out the current product
  const related = products?.filter((p) => p._id !== productId);

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <h2 className="text-xl font-bold w-full mb-4">Related Products</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">Error loading related products</div>
      ) : related?.length > 0 ? (
        related.map((product) => (
          <div key={product._id} className="w-[16rem]">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="rounded w-full"
              />
              <HeartIcon product={product} />
            </div>

            <Link to={`/product/${product._id}`}>
              <div className="p-2 flex justify-between">
                <p>{product.name}</p>
                <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  ${product.price}
                </span>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
