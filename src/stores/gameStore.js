import { create } from 'zustand'

export const useGameStore = create((set, get) => ({
  // 游戏状态
  isRunning: true,
  isPaused: false,

  // 车辆状态
  speed: 0,
  position: { x: 0, y: 0.5, z: 0 },
  rotation: 0,

  // 控制参数
  controls: {
    acceleration: 200,
    turnSpeed: 4.5,
    maxSpeed: 80,
    brakeForce: 0.80,
  },

  // 键盘状态
  keys: {},

  // Actions
  setSpeed: (speed) => set({ speed }),

  setPosition: (position) => set({ position }),

  setRotation: (rotation) => set({ rotation }),

  setKey: (key, pressed) => set((state) => ({
    keys: { ...state.keys, [key]: pressed }
  })),

  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  updateControls: (newControls) => set((state) => ({
    controls: { ...state.controls, ...newControls }
  })),

  resetGame: () => set({
    speed: 0,
    position: { x: 0, y: 0.5, z: 0 },
    rotation: 0,
    isPaused: false,
  }),
}))
