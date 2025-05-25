# VoyageX - Next-Gen Travel Platform
https://voyager-x2-a0fu576an-abhis-projects-ef1dfe3f.vercel.app/destinations
Visit this link 
A modern, AI-powered travel platform built with Next.js, React Three Fiber, and 
Tailwind CSS.

Copyright © 2025 Abhinand. All rights reserved.
> ⚠️ **Important Notice**: This software is protected by copyright law and includes 
advanced code protection systems. Viewing is permitted for personal reference only. Any 
copying, modification, or distribution is strictly prohibited without explicit written 
permission.

## 🌟 Features

### 1. Interactive 3D Globe
- Real-time 3D globe visualization using Three.js
- Interactive navigation and zoom controls
- Stunning visual effects with stars and ambient lighting
- WebGL-based rendering for optimal performance
- Custom shaders for atmospheric effects
- Responsive camera controls with OrbitControls

### 2. Destination Exploration
- Browse through carefully curated travel destinations
- Detailed destination cards with:
  - High-quality images
  - Pricing information
  - Duration and best time to visit
  - Rating system
  - Category tags
  - Virtual tour options
- Server-side rendered content for SEO
- Client-side state management with React hooks
- Optimized image loading with Next.js Image component

### 3. Advanced Search & Filtering
- Search destinations by name or description
- Filter by categories (Europe, Asia, Middle East, etc.)
- Sort by price or rating
- Tag-based filtering system
- Real-time search results
- Debounced search input for performance
- Memoized filter functions
- URL-based state management for shareable searches

### 4. Virtual Tours
- VR-enabled destination previews
- Interactive 360° views
- Immersive travel experience before booking
- WebXR support for VR devices
- Three.js scene management
- Custom camera controls for VR mode

### 5. Modern UI/UX
- Responsive design for all devices
- Smooth animations using Framer Motion
- Glass-morphism effects
- Parallax scrolling
- Loading states and transitions
- CSS Grid and Flexbox layouts
- Custom scroll-based animations
- Intersection Observer for lazy loading

## 🛠️ Tech Stack

### Core Technologies
- **Frontend Framework**: Next.js 13+ with App Router
  - Server Components for improved performance
  - Client Components for interactive features
  - Route handlers for API endpoints
  - Middleware for authentication
- **3D Graphics**: 
  - Three.js for 3D rendering
  - React Three Fiber for React integration
  - Drei for useful Three.js helpers
  - Custom shaders for special effects
- **Animations**: 
  - Framer Motion for UI animations
  - CSS transitions for performance
  - Custom animation hooks
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - CSS Modules for component-specific styles
  - Custom CSS variables for theming
- **State Management**:
  - React Context for global state
  - React Query for server state
  - Local storage for persistence
- **Performance Optimization**:
  - Image optimization with next/image
  - Code splitting with dynamic imports
  - Bundle analysis with @next/bundle-analyzer
  - Performance monitoring with web-vitals

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Jest** for unit testing
- **Cypress** for E2E testing
- **Storybook** for component development
- **GitHub Actions** for CI/CD

## 📦 Project Structure

```
voyax/
├── src/
│   ├── app/
│   │   ├── destinations/
│   │   │   ├── page.tsx           # Main destinations page
│   │   │   ├── loading.tsx        # Loading state
│   │   │   └── error.tsx          # Error handling
│   │   ├── api/                   # API routes
│   │   └── layout.tsx             # Root layout
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── InteractiveGlobe.tsx
│   │   │   ├── GlobeControls.tsx
│   │   │   └── shaders/           # Custom shaders
│   │   ├── ui/
│   │   │   ├── loading.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   └── Navigation.tsx
│   ├── hooks/                     # Custom React hooks
│   │   ├── useScroll.ts
│   │   ├── useAnimation.ts
│   │   └── useVR.ts
│   ├── utils/                     # Utility functions
│   │   ├── animations.ts
│   │   ├── filters.ts
│   │   └── helpers.ts
│   ├── types/                     # TypeScript types
│   │   └── index.ts
│   └── styles/                    # Global styles
│       └── globals.css
├── public/
│   ├── destinations/              # Destination images
│   └── assets/                    # Static assets
├── tests/                         # Test files
├── .github/                       # GitHub Actions
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/voyax.git
```

2. Install dependencies:
```bash
cd voyax
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## 🔧 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write unit tests for critical components
- Document complex functions and components

### Performance Optimization
- Implement proper code splitting
- Use React.memo for expensive components
- Optimize images and assets
- Monitor bundle size
- Implement proper caching strategies

### Testing
- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Cypress
- Visual regression tests with Percy
- Performance testing with Lighthouse

## 📱 Pages

### Destinations Page
- Server-side rendered with Next.js
- Client-side interactivity with React
- 3D globe with Three.js
- Real-time search and filtering
- Responsive grid layout
- Modal system for details
- Loading states and error handling

## 🎨 Design Features

### Glass Morphism
- CSS backdrop-filter for glass effect
- Custom gradient overlays
- Dynamic blur effects
- Hover state animations
- Shadow effects

### Responsive Layout
- Mobile-first approach
- CSS Grid and Flexbox
- Breakpoint system
- Responsive typography
- Touch-friendly interactions

### Loading States
- Skeleton loading
- Progressive image loading
- Suspense boundaries
- Loading animations
- Error states

## 🔒 Security

- Input validation and sanitization
- XSS protection
- CSRF tokens
- Rate limiting
- Secure headers
- Environment variable protection
- API route protection

## 📈 Performance

- Image optimization
- Code splitting
- Tree shaking
- Bundle analysis
- Performance monitoring
- Caching strategies
- Lazy loading
- Prefetching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Workflow
- Follow Git Flow branching strategy
- Write meaningful commit messages
- Update documentation
- Add tests for new features
- Ensure all tests pass
- Update changelog

## 📄 License

This project is licensed under License - see the [LICENSE](LICENSE) file for details.


## Contact

For licensing inquiries or permissions, please contact the copyright holder.

---

Made with ❤️ by the  Team
