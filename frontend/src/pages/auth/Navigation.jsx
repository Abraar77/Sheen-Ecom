
import { useState } from 'react'
import { Form } from 'react-router'
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart
} from "react-icons/ai"
import { FaHeart } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "./Navigation.css";
import { useDispatch, useSelector } from 'react-redux'
import {  useLogoutMutation } from '../../redux/api/userApiSlice'
import { logout } from '../../redux/features/auth/authSlice'
import FavoritesCount from '../Products/FavoritesCount'
import CartCount from '../CartCount'
const Navigation = () => {
  const { userInfo } = useSelector(state => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const closeSidebar = () => {
    setShowSidebar(false)
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : "flex"} xl:flexlg:flex md:hidden sm:hidden flex-col
    justify-between p-4 text-white bg-black w-[4%] hover:w-[15%]
    h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className='flex items-center transition-transform transform
          hover:translate-x-2' >
          <AiOutlineHome className='mr-2 mt-[0.5rem]' size={26} />
          <span className="hidden nav-item-name mt-[3rem">HOME</span>
        </Link>
        <Link
          to="/shop"
          className='flex items-center transition-transform transform
          hover:translate-x-2' >
          <AiOutlineShopping className='mr-2 mt-[0.5rem]' size={26} />
          <span className="hidden nav-item-name mt-[3rem">SHOP</span>
        </Link>
        <Link
          to="/cart"
          className='flex relative items-center transition-transform transform
          hover:translate-x-2' >
            {/* <div className="flex justify-center relative items-center transition-transform transform hover:translate-x-2"> */}
          <AiOutlineShoppingCart className='mr-2 mt-[0.5rem]' size={26} />
          <span className="hidden nav-item-name mt-[3rem">CART</span> {" "}
          <CartCount/>
          {/* </div> */}
        </Link>
        <Link to="/favorites" className="flex relative">
          <div className="flex  justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className=" mt-[.5rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[.5rem]">
              Favorites
            </span>{" "}
            <FavoritesCount />
          </div>
        </Link>
      </div>
      <div className="relative">
        <button onClick={toggleDropdown}
          className="flex items-center text-gray-8000 focus:outline-none">
          {userInfo ? <span className='text-white'>{userInfo.username}</span> : (<></>)}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 cursor-pointer ${dropdownOpen ? "transform rotate-180" : ""
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}

        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-black-100 text-white ${!userInfo.isAdmin ? "-top-20" : "-top-80"
              } `}
          >

            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-pink-400"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-pink-400"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-pink-400"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-pink-400"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-pink-400"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-pink-400">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className=" cursor-pointer block w-full px-4 py-2 text-left hover:bg-pink-400"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className='flex items-center transition-transform transform
             hover:translate-x-2' >
              <AiOutlineLogin className='mr-2 mt-[0.5rem]' size={26} />
              <span className="hidden nav-item-name mt-[3rem">Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="register"
              className='flex items-center transition-transform transform
             hover:translate-x-2' >
              <AiOutlineUserAdd className='mr-2 mt-[0.5rem]' size={26} />
              <span className="hidden nav-item-name mt-[3rem">register</span>
            </Link>
          </li>
        </ul>
      )}

    </div>
  )
}

export default Navigation
