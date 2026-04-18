import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

/* ================= GET USER ================= */
export const getUser = createAsyncThunk(
  "user/me",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.get("/user/me");
      return res?.data?.user;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data || "Failed to fetch user"
      );
    }
  }
);

/* ================= LOGOUT ================= */
export const logout = createAsyncThunk(
  "user/sign-out",
  async (_, thunkApi) => {
    try {
      await axiosInstance.get("/user/sign-out");
      return null;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkApi.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

/* ================= LOGIN ================= */
export const login = createAsyncThunk(
  "user/sign-in",
  async (data, thunkApi) => {
    try {
      const res = await axiosInstance.post("/user/sign-in", data);
      toast.success("Logged in successfully");
      return res.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkApi.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

/* ================= SIGNUP ================= */
export const signup = createAsyncThunk(
  "auth/sign-up",
  async (data, thunkApi) => {
    try {
      console.log(data)
      const res = await axiosInstance.post("/user/sign-up", data);
      toast.success("Account created successfully");
      return res?.data?.user;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkApi.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

//Update profile 
export const updateProfile = createAsyncThunk("user/update-profile",async(data,thunkApi)=>{
  try {
    const res = await axiosInstance.put("/user/update-profile",data);
    toast.success("profile update successfully");
    return res.data
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkApi.rejectWithValue(error.response.data.message);
  }
})


/* ================= SLICE ================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateProfile:false,
    isCheckingAuth: true,
    onlineUsers: [],
    error: null
  },

  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      /* GET USER */
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })

      /* LOGOUT */
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })

      /* LOGIN */
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      /* SIGNUP */
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state,) => {
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      })
      // UpdateProfile
      .addCase(updateProfile.pending, (state) => {
  state.isUpdateProfile = true;
})

.addCase(updateProfile.fulfilled, (state, action) => {
  state.isUpdateProfile = false;
  state.authUser = action.payload;
})

.addCase(updateProfile.rejected, (state, ) => {
  state.isUpdateProfile = false;
});
  }
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;