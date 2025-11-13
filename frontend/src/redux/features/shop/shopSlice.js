import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  checked: [],
  radio: [],
  brandCheckboxes: {},
  checkedBrands: [],
  searchedProducts: [],

};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setSearchedProducts: (state, action) => {
      state.searchedProducts = action.payload;
    }
    
  },
});

export const {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
  setSelectedBrand,
  setSearchedProducts
} = shopSlice.actions;

export default shopSlice.reducer;