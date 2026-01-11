# CLAUDE.md - AI Assistant Guide for 3D Vehicle Game

## Project Overview

**Project Name:** 3D Vehicle Game (3D小车游戏)
**Type:** Interactive 3D web-based driving simulator
**Architecture:** Single-file web application
**Primary Language:** JavaScript (ES6 modules), Chinese UI
**Status:** Complete initial implementation

This is a self-contained 3D car driving game built with Three.js that demonstrates physics simulation, collision detection, and real-time 3D rendering in the browser.

---

## Quick Facts

- **Total Files:** 1 (`index.html`)
- **Lines of Code:** ~374 lines
- **Dependencies:** Three.js v0.160.0 (CDN-loaded)
- **Build System:** None (runs directly in browser)
- **Deployment:** Static file hosting (no build required)

---

## Project Structure

```
vehicle-3d/
├── index.html          # Single file containing all HTML, CSS, and JavaScript
└── .git/               # Git repository
```

### File Organization Within `index.html`

The file is organized into clear sections:

1. **HTML Structure** (lines 1-46)
   - Meta tags and viewport configuration
   - Info panel for controls display

2. **CSS Styles** (lines 7-35)
   - Reset and base styles
   - Info panel styling (semi-transparent overlay)

3. **Import Maps** (lines 48-55)
   - Three.js CDN configuration
   - Addon path mapping

4. **JavaScript Module** (lines 57-372)
   - Scene setup (lines 61-106)
   - Vehicle model creation (lines 108-166)
   - Environment creation (lines 168-216)
   - Physics system (lines 218-266)
   - Input handling (lines 268-284)
   - Game loop (lines 286-361)
   - Window event handlers (lines 364-368)

---

## Technology Stack

### Core Technologies
- **Three.js v0.160.0** - 3D graphics library
  - OrbitControls addon (imported but not actively used)
  - Standard materials and geometries
  - PCF soft shadow mapping
  - WebGL renderer

### Browser APIs Used
- ES6 Modules (`import`/`export`)
- Import Maps for CDN resolution
- RequestAnimationFrame for game loop
- Keyboard events (keydown/keyup)
- Window resize events

### Minimum Browser Requirements
- ES6 module support
- WebGL 2.0 support
- Modern CSS (flexbox, rgba)
- RequestAnimationFrame API

---

## Architecture & Key Components

### 1. Scene Configuration

**Environment Settings:**
- Background: Sky blue (`0x87CEEB`)
- Fog: Linear fog (50-200 units)
- Ground: 200x200 unit plane with green grass color (`0x4a7c3c`)
- Grid: 40-division grid with 10% opacity

**Lighting System:**
- Ambient light: White, 0.6 intensity
- Directional light: White, 0.8 intensity, position (50, 50, 50)
- Shadow mapping: 2048x2048 resolution, PCF soft shadows
- Shadow camera: Orthographic, 100x100 unit coverage

### 2. Vehicle Model (`carGroup`)

**Component Hierarchy:**
```
carGroup (THREE.Group)
├── carBody (Box 3x1.2x5, red #ff4444)
├── carRoof (Box 2.5x0.8x3, dark red #cc0000)
├── frontWindow (Plane, blue transparent)
├── backWindow (Plane, blue transparent)
└── wheels[4] (Cylinders 0.5 radius, 0.3 height, black #222222)
```

**Wheel Positions:**
- Front-left: (-1.5, 0.5, 1.8)
- Front-right: (1.5, 0.5, 1.8)
- Rear-left: (-1.5, 0.5, -1.8)
- Rear-right: (1.5, 0.5, -1.8)

### 3. Physics System

**PhysicsObject Class:**
- Properties: `velocity`, `acceleration`, `mass`, `friction`, `angularVelocity`
- Methods:
  - `applyForce(force)` - Applies force (F = ma)
  - `update(deltaTime)` - Integrates physics using Euler method
  - `checkCollision(object, minDistance)` - Sphere collision with rebound

**Car Physics Parameters:**
- Mass: 5 units
- Friction: 0.96 (96% velocity retention per frame)
- Collision rebound: 30% velocity reversal
- Angular decay: 85% per frame

### 4. Control System

**Keyboard Mapping:**
| Key | Action | Force/Value |
|-----|--------|-------------|
| W | Forward acceleration | 200 units |
| S | Reverse | 140 units (70% of forward) |
| A | Turn left | +4.5 rad/s angular velocity |
| D | Turn right | -4.5 rad/s angular velocity |
| Space | Brake | 80% velocity reduction |

**Control Parameters** (`carControls` object at line 279):
```javascript
{
  acceleration: 200,
  turnSpeed: 4.5,
  maxSpeed: 80,
  brakeForce: 0.80
}
```

### 5. Game World

**Obstacles:**
- 16 trees placed at predefined positions (lines 207-212)
- Each tree: Brown trunk (cylinder) + 2-layer green foliage (cones)
- Collision radius: 3 units (sphere collision)

**Boundaries:**
- World limits: ±95 units in X and Z axes
- Boundary collision: Velocity reversal with 30% rebound

### 6. Camera System

**Follow Camera:**
- Type: Perspective (75° FOV)
- Offset: (0, 10, 18) in car's local space
- Smoothing: Lerp with 0.15 factor
- Look-at target: Car position + 2 units Y

---

## Development Workflows

### Making Changes to the Game

Since this is a **single-file application**, all modifications go in `index.html`:

1. **Read the file first** - Always use Read tool before making edits
2. **Identify the section** - Locate the relevant code section using line numbers
3. **Use Edit tool** - Make precise edits with old_string/new_string
4. **Test in browser** - Open index.html directly in a browser
5. **Commit changes** - Use descriptive commit messages

### Common Modification Scenarios

#### Adding New Game Objects
1. Create geometry and material (around lines 168-203)
2. Position in scene using `scene.add()`
3. Enable shadows: `object.castShadow = true`
4. Add to collision detection if needed (lines 327-341)

#### Adjusting Physics
- Modify `carControls` object (lines 279-284)
- Change `carPhysics.mass` or `carPhysics.friction` (lines 264-266)
- Adjust collision response in `checkCollision()` (lines 246-261)

#### Changing Controls
- Modify key mappings in game loop (lines 296-316)
- Update UI text in `#info` div (lines 38-45)
- Adjust `turnSpeed` or `acceleration` values

#### Updating Visual Appearance
- Change colors in material definitions
- Modify geometry dimensions
- Adjust lighting properties (lines 76-88)
- Change fog settings (line 64)

---

## Code Conventions

### Naming Conventions
- **camelCase** for variables and functions: `carGroup`, `createTree`, `deltaTime`
- **PascalCase** for classes: `PhysicsObject`
- **UPPERCASE** for constants (if added): `MAX_SPEED`, `TREE_COUNT`

### Code Organization Principles
1. **Declarative setup first** - Scene, camera, renderer initialization
2. **Asset creation** - Models, geometry, materials
3. **System classes** - Physics, game logic classes
4. **Event handlers** - Input, resize events
5. **Game loop last** - Animation loop at end

### Vector Mathematics
- Use `THREE.Vector3` for all 3D math
- Clone vectors before modifying: `vector.clone().add(offset)`
- Use quaternions for rotations: `vector.applyQuaternion(quaternion)`

### Physics Integration
- **Delta time based** - All movement scaled by `deltaTime`
- **Force-based** - Apply forces, not direct velocity changes
- **Euler integration** - Simple but functional for arcade physics

---

## Important Patterns & Practices

### DO's ✓

1. **Always use deltaTime** for time-dependent operations
   ```javascript
   velocity.add(acceleration.clone().multiplyScalar(deltaTime))
   ```

2. **Clone vectors** before operations that modify them
   ```javascript
   const force = forward.clone().multiplyScalar(acceleration)
   ```

3. **Enable shadows** for new objects
   ```javascript
   object.castShadow = true;  // Object casts shadows
   ground.receiveShadow = true;  // Ground receives shadows
   ```

4. **Use Groups** for complex objects
   ```javascript
   const group = new THREE.Group();
   group.add(part1, part2, part3);
   ```

5. **Normalize vectors** for direction calculations
   ```javascript
   direction.normalize().multiplyScalar(distance)
   ```

6. **Reset acceleration** after each physics update
   ```javascript
   this.acceleration.set(0, 0, 0);
   ```

### DON'Ts ✗

1. **Don't modify vectors in-place** without cloning first
   ```javascript
   // Bad: Modifies original
   this.applyForce(forward.multiplyScalar(100));

   // Good: Clones first
   this.applyForce(forward.clone().multiplyScalar(100));
   ```

2. **Don't create objects in the game loop**
   ```javascript
   // Bad: Creates new Vector3 every frame
   function animate() {
     const v = new THREE.Vector3(0, 0, 0);
   }
   ```

3. **Don't skip deltaTime** for physics
   ```javascript
   // Bad: Frame-rate dependent
   position.add(velocity);

   // Good: Frame-rate independent
   position.add(velocity.clone().multiplyScalar(deltaTime));
   ```

4. **Don't hardcode values** - use the `carControls` object
   ```javascript
   // Bad
   if (keys['w']) { carPhysics.applyForce(new Vector3(0, 0, -200)); }

   // Good
   if (keys['w']) {
     carPhysics.applyForce(forward.multiplyScalar(carControls.acceleration));
   }
   ```

---

## Testing & Debugging

### Local Testing
1. Open `index.html` directly in a modern browser
2. No build step or server required (though CORS may require local server for some features)
3. Use browser DevTools console for JavaScript debugging

### Common Issues

**Problem: Car doesn't move**
- Check keyboard event listeners are attached
- Verify physics update is called in game loop
- Check that deltaTime is non-zero

**Problem: Jerky movement**
- Ensure all movement uses `deltaTime`
- Check frame rate (should be ~60fps)
- Verify lerp values aren't too low/high

**Problem: Collisions not working**
- Check collision radius matches object sizes
- Verify objects have positions set
- Ensure collision detection runs after physics update

**Problem: Shadows missing**
- Verify `renderer.shadowMap.enabled = true`
- Check `castShadow`/`receiveShadow` properties
- Ensure light has `castShadow = true`

### Performance Debugging
- Use browser performance profiler
- Check for object creation in game loop
- Monitor garbage collection with DevTools
- Verify shadow map resolution isn't too high

---

## Git Workflow

### Branch Strategy
- Main/master branch: Stable releases
- Feature branches: `claude/claude-md-*` pattern for AI assistant work
- Always develop on the assigned branch

### Commit Guidelines

**Good commit messages:**
```
Add speed boost power-up system
Fix collision detection with boundary walls
Update car controls to be more responsive
Optimize wheel rotation animation
```

**Bad commit messages:**
```
Update
Fix bug
Changes
WIP
```

### Push Protocol
```bash
# Always push to the current branch with -u flag
git push -u origin <branch-name>

# If network errors occur, retry with exponential backoff
# (automatically handled, but good to know)
```

---

## Extension Ideas & Future Work

### Easy Additions
- **More trees** - Add to `treePositions` array
- **Different colors** - Change material colors
- **Speed indicator** - Display current speed in UI
- **Sound effects** - Add Web Audio API sounds
- **Multiple cars** - Duplicate carGroup with different colors

### Medium Complexity
- **Obstacles** - Add rocks, buildings, other objects
- **Terrain** - Use heightmap for hills
- **Particle effects** - Dust trails, tire marks
- **Day/night cycle** - Animate light color and intensity
- **Minimap** - Orthographic camera overlay

### Advanced Features
- **Multiplayer** - WebRTC or WebSocket synchronization
- **Physics upgrade** - Integrate Cannon.js or Ammo.js
- **Track system** - Checkpoints and lap timing
- **AI opponents** - Pathfinding and racing AI
- **Mobile controls** - Touch screen joystick

---

## Performance Considerations

### Current Optimizations
- Static geometry (no mesh updates per frame)
- Simple collision detection (sphere vs sphere)
- Fog culling (objects beyond 200 units not rendered)
- Fixed shadow map resolution
- Minimal draw calls (~20 objects)

### Performance Limits
- **Tree count:** Currently 16, can handle ~100 before slowdown
- **Shadow resolution:** 2048x2048 is good for most devices
- **Physics objects:** Currently 1, can handle ~50 with current system

### Optimization Tips
1. Use `BufferGeometry` for custom shapes
2. Merge static geometry to reduce draw calls
3. Implement frustum culling for distant objects
4. Use instanced meshes for repeated objects (trees)
5. Lower shadow map resolution on slower devices

---

## API Reference

### Key Objects & Methods

#### `PhysicsObject`
```javascript
const physics = new PhysicsObject(mesh);
physics.mass = 5;
physics.friction = 0.96;
physics.applyForce(new THREE.Vector3(0, 0, -100));
physics.update(deltaTime);
physics.checkCollision(targetObject, minDistance);
```

#### `carControls`
```javascript
carControls.acceleration = 200;  // Forward/backward force
carControls.turnSpeed = 4.5;     // Rotation speed (rad/s)
carControls.maxSpeed = 80;       // Speed limit
carControls.brakeForce = 0.80;   // Brake strength (0-1)
```

#### `createTree(x, z)`
```javascript
const tree = createTree(10, 20);  // Creates tree at position
// Returns THREE.Group with trunk and foliage
```

### Global Variables
- `scene` - THREE.Scene containing all objects
- `camera` - THREE.PerspectiveCamera following car
- `renderer` - THREE.WebGLRenderer
- `carGroup` - THREE.Group containing vehicle parts
- `wheels` - Array of 4 wheel meshes
- `trees` - Array of 16 tree groups
- `carPhysics` - PhysicsObject for car
- `keys` - Object tracking pressed keys
- `clock` - THREE.Clock for deltaTime

---

## Troubleshooting for AI Assistants

### When Asked to Add Features

1. **Read the file first** - Never edit without reading
2. **Understand the structure** - Locate relevant sections
3. **Make minimal changes** - Don't refactor unnecessarily
4. **Preserve formatting** - Match existing indentation
5. **Test mentally** - Verify logic before editing
6. **Update UI if needed** - Change control instructions if controls change

### When Asked to Fix Bugs

1. **Reproduce the issue** - Understand what's wrong
2. **Locate the code** - Find relevant section
3. **Verify physics** - Check deltaTime, vectors, collision
4. **Check event handlers** - Ensure events are bound
5. **Test edge cases** - Boundaries, collisions, zero values

### When Asked to Explain Code

1. **Reference line numbers** - Use `index.html:123` format
2. **Explain physics** - Describe forces, velocities, acceleration
3. **Show vector math** - Explain transformations clearly
4. **Relate to game behavior** - Connect code to player experience

### Common Questions

**Q: Can I split this into multiple files?**
A: Yes, but requires a module bundler or ES6 module setup. Current single-file design is intentional for simplicity.

**Q: How do I add new controls?**
A: Add key checks in the game loop (lines 296-316) and update the UI in lines 38-45.

**Q: Why use CDN for Three.js?**
A: No build step required, instant updates, browser caching benefits.

**Q: Can I use TypeScript?**
A: Yes, but requires build step (tsc or Vite). Adds complexity vs benefits for this project size.

**Q: How do I change the car model?**
A: Modify the geometry/materials in lines 108-163, or load a GLTF model with GLTFLoader.

---

## Security Considerations

### Safe Practices
- No user input processing (beyond keyboard)
- No external data fetching
- No eval() or dynamic code execution
- CDN uses SRI hashes (could be added)
- No localStorage or cookies

### Potential Improvements
- Add Subresource Integrity (SRI) to script tags
- Use Content Security Policy (CSP) headers
- Validate any future user input
- Sanitize any text rendering

---

## Localization Notes

**Current Language:** Chinese (zh-CN)
- UI labels in simplified Chinese
- HTML lang attribute: `zh-CN`
- Control instructions in Chinese

**To Translate:**
1. Change `<html lang="zh-CN">` to target language
2. Update text in `#info` div (lines 39-44)
3. Update document title (line 6)
4. Update comments if desired (currently in Chinese)

---

## License & Attribution

**Three.js:** MIT License (https://threejs.org/)
**Project:** License not specified (check repository)

---

## Quick Reference for Common Tasks

### Change Car Color
```javascript
// Line 113
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff4444 });
// Change 0xff4444 to desired hex color
```

### Adjust Speed
```javascript
// Line 280
acceleration: 200,  // Increase for faster acceleration
// Line 282
maxSpeed: 80,       // Increase for higher top speed
```

### Add More Trees
```javascript
// Line 207-212: Add coordinates to array
const treePositions = [
  [-20, -20], [20, -20], // ... existing positions
  [40, 40], [-40, -40]   // Add new positions
];
```

### Change Camera View
```javascript
// Line 350: Adjust offset
const idealOffset = new THREE.Vector3(0, 10, 18);
// Increase Z for farther, Y for higher
```

### Modify Ground Size
```javascript
// Line 91
const groundGeometry = new THREE.PlaneGeometry(200, 200);
// Change dimensions (also update boundary at line 333)
```

---

## Summary

This is a **well-structured, single-file 3D game** that demonstrates:
- Three.js 3D graphics fundamentals
- Physics simulation and collision detection
- Keyboard input handling
- Game loop architecture
- Camera systems and following mechanics

**Key Strength:** Simplicity - everything in one file, no build process, easy to understand and modify.

**Best Use Cases:** Learning Three.js, prototyping 3D games, educational demonstrations, quick experiments.

When working with this codebase, prioritize **clarity**, **performance**, and **maintainability** of the single-file structure. Avoid over-engineering while ensuring changes are well-integrated with the existing architecture.

---

*This guide was created for AI assistants working with the 3D Vehicle Game codebase. Last updated: 2026-01-11*
