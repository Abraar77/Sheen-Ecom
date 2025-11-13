import { useSelector } from "react-redux";
import { selectFavoriteProduct} from "../../redux/features/favorites/favoritesSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

        {favorites.length===0? (
          <div className="text-white mt-6 flex justify-center gap-2 text-.5xl"> Your Favorites is empty click {"   "} 
          <Link to={`/shop`} className="underline font-bold ">Shop</Link> {""} to add products</div>
        ):(<div className="flex flex-wrap"> 
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
        )}
    </div>
  );
};

export default Favorites;