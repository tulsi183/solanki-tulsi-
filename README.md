# Jinu Creation

Jinu Creation is a premium, modern, and responsive React-based ecommerce frontend designed for a handmade home decor brand. The application features a "Designer" aesthetic with smooth animations, artistic backgrounds, and a functional shopping experience.

## ✨ Features

### 1. Multi-Page Experience
The project is structured as a single-page application (SPA) with state-based navigation, simulating a multi-page site with smooth transitions:
- **Home**: Hero section with a strong call-to-action.
- **Products**: A filterable gallery of artisanal products.
- **About**: The brand's story and mission.
- **Contact**: A functional inquiry form with success notifications.

### 2. Designer Aesthetic
- **Animated Background**: A slow-moving radial gradient background that shifts through brand colors.
- **Artistic Blobs**: Floating, animated abstract shapes that add depth and creativity.
- **Grain Texture**: A subtle stardust texture overlay for a tactile, "handmade paper" feel.
- **Grid Pattern**: A professional dot-grid overlay for structural elegance.
- **Organic UI**: Product cards feature irregular border radii to emphasize the "handmade" theme.

### 3. Functional Ecommerce Elements
- **Shopping Cart**: A functional cart drawer where users can add/remove items and update quantities.
- **WhatsApp Integration**: 
    - **Product Inquiries**: Direct WhatsApp chat for specific products.
    - **Bulk Checkout**: Generates a complete order list message for WhatsApp checkout.
    - **Floating Button**: A persistent WhatsApp button for general inquiries.
- **Toast Notifications**: Real-time feedback for adding items to the cart, submitting forms, and placing orders.

### 4. Responsive Design
- Fully mobile-responsive layout using Tailwind CSS.
- Adaptive navigation bar (sticky with glassmorphism effects).
- Optimized touch targets for mobile users.

## 🛠 Tech Stack

- **React 19**: Functional components and hooks (useState, useEffect).
- **Tailwind CSS 4**: Utility-first styling with custom theme colors.
- **Framer Motion**: For all animations (page transitions, hover effects, floating shapes).
- **Lucide React**: For a consistent and crisp icon set.
- **Vite**: Fast development and build tool.

## 📁 Project Structure

```text
/src
  ├── App.tsx          # Main application logic and all components
  ├── index.css        # Global styles, Tailwind imports, and custom animations
  ├── main.tsx         # Entry point
  └── types.ts         # TypeScript interfaces for Products and Cart
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Design Decisions

- **Color Palette**: A mix of soft pastels (Rose, Sage, Cream) and vibrant artistic accents (Teal, Mustard, Terracotta).
- **Typography**: `Inter` for clean body text and `Cormorant Garamond` for elegant, serif headings.
- **User Feedback**: Immediate visual feedback via Toast notifications to ensure a professional user experience.

---
*Handcrafted with Love for Jinu Creation.*
