import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

// ================== GET USERS ==================
export const getUsers = createAsyncThunk(
  "chat/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/message/users");
      return res.data.users;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch users";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// ================== GET MESSAGES ==================
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      return res.data.messages; // ✅ return only messages array
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch messages";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// ================== SEND MESSAGE ==================
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, thunkAPI) => {
    try {
      const { chat } = thunkAPI.getState();

      const res = await axiosInstance.post(
        `/message/send/${chat.selectedUser._id}`,
        messageData
      );

      return res.data; // ✅ new message
    } catch (error) {
      const msg = error.response?.data?.message || "Send failed";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// ================== SLICE ==================
const chatSlice = createSlice({
  name: "chat",

  initialState: {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
  },

  reducers: {
    // ✅ Select user & reset messages
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = [];
    },

    // ✅ For socket real-time
    pushNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== USERS =====
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })

      // ===== MESSAGES =====
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isMessagesLoading = false; // ✅ VERY IMPORTANT
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })

      // ===== SEND MESSAGE =====
      .addCase(sendMessage.fulfilled, (state, action) => {
       state.messages.push(action.payload.message); // ✅ instant UI update
      });
  },
});

export const { setSelectedUser, pushNewMessage } = chatSlice.actions;
export default chatSlice.reducer;