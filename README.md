# 3D Vehicle Game / 3D小车游戏

A 3D car driving simulator built with React, Three.js, and modern web technologies.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![Three.js](https://img.shields.io/badge/Three.js-0.160-black.svg)

## Features

- Real-time 3D graphics with Three.js
- Physics simulation with collision detection
- Smooth camera follow system
- Responsive controls with keyboard input
- Speed indicator display
- Modern React architecture with Zustand state management
- Styled with Tailwind CSS and shadcn/ui components

## Tech Stack

- **React 18** - UI framework
- **Three.js** - 3D graphics library
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **shadcn/ui** - UI components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/catsonkeyboard/vehicle-3d.git
cd vehicle-3d

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Controls

| Key | Action |
|-----|--------|
| W | Accelerate forward |
| S | Reverse |
| A | Turn left |
| D | Turn right |
| Space | Brake |

## Project Structure

```
vehicle-3d/
├── src/
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Game.jsx      # Main game component
│   │   └── InfoPanel.jsx # HUD overlay
│   ├── game/             # Game logic
│   │   ├── Car.js        # Vehicle model
│   │   ├── Scene.js      # Scene setup
│   │   ├── Physics.js    # Physics engine
│   │   └── Tree.js       # Environment objects
│   ├── stores/           # Zustand stores
│   │   └── gameStore.js  # Game state
│   ├── lib/              # Utilities
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── CLAUDE.md             # AI assistant documentation
```

## License

MIT
