import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const createMenuFunc = createAsyncThunk(
  "menu/createMenu",
  async (menuData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/menu", menuData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMenuItemFunc = createAsyncThunk(
  "menu/createMenuItem",
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/menuItem", itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllMenusFunc = createAsyncThunk(
  "menu/getAllMenus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/menu");
      return response.data.map((menu) => ({
        id: menu.id,
        name: menu.name,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMenuItemFunc = createAsyncThunk(
  "menu/updateMenuItem",
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`api/menuItem/${id}`, itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMenuItemFunc = createAsyncThunk(
  "menu/deleteMenuItem",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`api/menuItem/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMenuByIdFunc = createAsyncThunk(
  "menu/getMenuById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/menu/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menus: [],
    menuItems: [],
    menu: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setMenus: (state, action) => {
      state.menus = action.payload;
      state.loading = false;
    },
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addMenu: (state, action) => {
      state.menus.push(action.payload);
    },
    addMenuItem: (state, action) => {
      state.menuItems.push(action.payload);
    },
    updateMenuItem: (state, action) => {
      const index = state.menuItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.menuItems[index] = action.payload;
      }
    },
    deleteMenuItem: (state, action) => {
      state.menuItems = state.menuItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setSingleMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenuFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenuFunc.fulfilled, (state, action) => {
        state.menus.push(action.payload);
        state.loading = false;
      })
      .addCase(createMenuFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // New case for fetching a menu by ID
      .addCase(getMenuByIdFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenuByIdFunc.fulfilled, (state, action) => {
        state.menu = action.payload; // Store the fetched menu data
        state.loading = false;
      })
      .addCase(getMenuByIdFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createMenuItemFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenuItemFunc.fulfilled, (state, action) => {
        state.menuItems.push(action.payload);
        state.loading = false;
      })
      .addCase(createMenuItemFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllMenusFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMenusFunc.fulfilled, (state, action) => {
        state.menus = action.payload;
        state.loading = false;
      })
      .addCase(getAllMenusFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateMenuItemFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenuItemFunc.fulfilled, (state, action) => {
        const index = state.menuItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.menuItems[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateMenuItemFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteMenuItemFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuItemFunc.fulfilled, (state, action) => {
        state.menuItems = state.menuItems.filter(
          (item) => item.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteMenuItemFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setLoading,
  setMenus,
  setMenuItems,
  setError,
  addMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setSingleMenu,
} = menuSlice.actions;

export default menuSlice.reducer;