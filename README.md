# Luv2Draw

![Demo Screenshot](demo-screenshot.png) <!-- Add a screenshot later -->

A simple web tool to help artists visualize perspective by overlaying 3D shapes on reference images.

## Why I Made This

I recently started learning to draw and was struggling with head perspective. When using reference images, I found it difficult to understand the actual 3D orientation. This tool allows you to:

- Upload any reference image
- Overlay adjustable 3D shapes (currently circle/sphere and cube)
- Rotate and adjust opacity of the 3D model
- Scale and position the reference image

While simple, it helped me better visualize the spatial relationships in my references. If similar tools exist, I'd love to know about them as they might offer additional features!

## Features

- **Reference Image Controls**:
  - Upload any image
  - Adjust scale, position, width and height
  - Automatic height scaling based on aspect ratio

- **3D Model Controls**:
  - Toggle between circle/sphere (Loomis-style) and cube
  - Adjust opacity (0-1)
  - Rotate on X, Y, and Z axes
  - Orbit controls to view from any angle

## How to Use

1. Upload your reference image using the upload button
2. Adjust the image position/size as needed
3. Select your 3D shape (circle or cube)
4. Rotate the shape to match your reference perspective
5. Adjust opacity to see through the model
6. Use mouse to orbit around the scene

## Technical Details

Built with:
- Three.js for 3D rendering
- Plain HTML/CSS for the UI
- No dependencies beyond Three.js

## Future Improvements

Potential additions:
- More 3D shapes (cylinders, planes, etc.)
- Save/load configurations
- Measurement tools
- Grid overlays
- Multiple reference images

## Installation

No installation needed - just open `index.html` in a browser. For local development:
1. Clone the repo
2. Open `index.html` in a browser

## License

MIT License - feel free to use and modify
