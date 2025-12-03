import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async () => {
    const response = await axios.get('http://localhost:5000/find');
    return response.data;
  }
);

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: [],
    filters: {
      city: '',
      name: '',
      price: '',
    },
    sortOrder: 'rating-desc',
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilterCity: (state, action) => {
      state.filters.city = action.payload;
    },
    setFilterName: (state, action) => {
      state.filters.name = action.payload;
    },
    setFilterPrice: (state, action) => {
      state.filters.price = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { city: '', name: '', price: '' };
      state.sortOrder = 'rating-desc';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hotels = action.payload;
      });
  },
});

export const {
  setFilterCity,
  setFilterName,
  setFilterPrice,
  setSortOrder,
  clearFilters,
} = hotelsSlice.actions;

// SELECTOR for filtered/sorted hotels
export const selectFilteredHotels = (state) => {
  let filtered = [...state.hotels.hotels];
  
  if (state.hotels.filters.city) {
    filtered = filtered.filter(hotel =>
      hotel.city.toLowerCase().includes(state.hotels.filters.city.toLowerCase())
    );
  }
  if (state.hotels.filters.name) {
    filtered = filtered.filter(hotel =>
      hotel.name.toLowerCase().includes(state.hotels.filters.name.toLowerCase())
    );
  }
  if (state.hotels.filters.price) {
    filtered = filtered.filter(hotel => hotel.price <= parseInt(state.hotels.filters.price));
  }

  // Sort
  filtered.sort((a, b) => {
    const ratingA = parseFloat(a.rating) || 0;
    const ratingB = parseFloat(b.rating) || 0;
    const priceA = a.price || 0;
    const priceB = b.price || 0;
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();

    switch (state.hotels.sortOrder) {
      case 'rating-asc': return ratingA - ratingB;
      case 'rating-desc': return ratingB - ratingA;
      case 'price-asc': return priceA - priceB;
      case 'price-desc': return priceB - priceA;
      case 'name-asc': return nameA.localeCompare(nameB);
      case 'name-desc': return nameB.localeCompare(nameA);
      default: return ratingB - ratingA;
    }
  });

  return filtered;
};

export default hotelsSlice.reducer;
