import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    searchQuery: '',
    selectedCategory: 'All',
    sortBy: 'default',
    wishlist: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter(wId => wId !== id);
      } else {
        state.wishlist.push(id);
      }
    }
  }
});

export const { setProducts, setSearchQuery, setSelectedCategory, setSortBy, toggleWishlist } = productSlice.actions;
export default productSlice.reducer;