import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface useSearchToggleStore {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useSearchToggle = create(
  persist<useSearchToggleStore>(
    (set, get) => ({
      isOpen: false,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      },
    }),
    {
      name: "searchOpen",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
