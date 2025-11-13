import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { addToFavorites,
        removeFromFavorites,
        setFavorites
} from "../../redux/features/favorites/favoritesSlice"

import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage"

const HeartIcon = ({product}) => {
    const dispatch= useDispatch();
    const favorites= useSelector((state)=> state.favorites) || [];
    const isFavorite = favorites.some((p)=> p._id ===product._id);

    useEffect (()=>{
    const favoritesFromLocalStorage= getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
    },[])

    const toggleFavorites=()=>{
        if(isFavorite){
            dispatch(removeFromFavorites(product));

            //remove from localstorage as well

            removeFavoriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavorites(product));

            //add the product to localstorage as well

            addFavoriteToLocalStorage(product);
        }
    }

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-black" />
      )}
    </div>
  
  );
}

export default HeartIcon