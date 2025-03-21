import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isLoadingUsers: false,
  isLoadingMessages: false,
  isSendingMessages: false,

  getUsers: async () => {
    set({ isLoadingUsers: true });
    try {
      const res = await axiosInstance.get("/messages/getUsers");

      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  getMessages: async (userId) => {
    set({ isLoadingMessages: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingMessages: false });
    }
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser: selectedUser });
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    if (!selectedUser) {
      toast.error("No user selected!");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
