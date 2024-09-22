import { create } from "zustand";

interface SidebarStore {
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  onLeftCollapse: () => void;
  onRightCollapse: () => void;
  onLeftExpand: () => void;
  onRightExpand: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  leftCollapsed: false,
  rightCollapsed: false,
  onLeftCollapse: () => set({ leftCollapsed: true }),
  onRightCollapse: () => set({ rightCollapsed: true }),
  onLeftExpand: () => set({ leftCollapsed: false }),
  onRightExpand: () => set({ rightCollapsed: false }),
}))