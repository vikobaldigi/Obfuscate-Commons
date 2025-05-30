// /docs/js/animation-controller.js
// OPTIMIZED: Fast-loading Animation Controller for Obfuscate-OS v3.0

class OptimizedAnimationController {
  constructor() {
    this.isReady = false;
    this.performanceMode = this.detectPerformanceMode();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip heavy initialization if reduced motion is preferred
    if (this.reducedMotion) {
      this.isReady = true;
      console.log('[animation-controller] Reduced motion detected - lightweight mode');
      return;
    }
    
    this.init();
  }

  detectPerformanceMode() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    return slowConnection || lowMemory ? 'low' : 'high';
  }

  async init() {
    console.log('[animation-controller] Initializing optimized animations...');
    
    // Fast initialization without blocking
    this.setupEventListeners();
    
    // Light particle system for high-performance mode only
    if (this.performanceMode === 'high') {
      this.initLightParticles();
    }
    
    this.isReady = true;
    console.log('[animation-controller] Ready');
  }

  setupEventListeners() {
    // Optimized scroll handling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => this.handleScroll(), 16); // 60fps
    }, { passive: true });

    // Visibility change optimization
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }

  initLightParticles() {
    // Create only a few particles to avoid performance issues
    const particleContainer = document.createElement('div');
    particleContainer.id = 'light-particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    `;

    // Create 3-5 light particles
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.createLightParticle(particleContainer);
      }, i * 1000);
    }

    document.body.appendChild(particleContainer);
  }

  createLightParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.3 + 0.1;
    const duration = Math.random() * 6 + 8;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(159, 112, 255, ${opacity}), transparent);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: 100%;
      animation: float-up ${duration}s linear infinite;
      pointer-events: none;
    `;

    container.appendChild(particle);

    // Clean up
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, duration * 1000);
  }

  handleScroll() {
    if (this.performanceMode === 'low') return;
    
    // Light parallax effect
    const scrolled = window.pageYOffset;
    const header = document.querySelector('#terminal-header');
    
    if (header && scrolled < window.innerHeight) {
      const rate = scrolled * -0.02;
      header.style.transform = `translateY(${rate}px)`;
    }
  }

  // Public methods for external interaction
  updateMousePosition(element, event) {
    if (this.performanceMode === 'low') return;
    
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    element.style.setProperty('--mouse-x', x + '%');
    element.style.setProperty('--mouse-y', y + '%');
  }

  clearMousePosition(element) {
    element.style.removeProperty('--mouse-x');
    element.style.removeProperty('--mouse-y');
  }

  animateClick(element) {
    if (this.reducedMotion) return;
    
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }

  animatedScrollToTop() {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }

  createRippleEffect(element, event) {
    if (this.performanceMode === 'low' || this.reducedMotion) return;

    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 0.8;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(159, 112, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }

  highlightElement(element) {
    if (this.reducedMotion) return;
    
    const originalTransform = element.style.transform;
    element.style.transform = 'scale(1.03)';
    element.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
      element.style.transform = originalTransform;
    }, 200);
  }

  pauseAnimations() {
    document.body.style.animationPlayState = 'paused';
  }

  resumeAnimations() {
    document.body.style.animationPlayState = 'running';
  }

  // Debug utilities
  getStats() {
    return {
      performanceMode: this.performanceMode,
      reducedMotion: this.reducedMotion,
      isReady: this.isReady
    };
  }
}

// Auto-initialize when script loads
(function() {
  // Don't initialize if already exists
  if (window.animationController) {
    console.log('[animation-controller] Already initialized');
    return;
  }
  
  window.animationController = new OptimizedAnimationController();
  
  // Add necessary CSS animations if they don't exist
  if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
      @keyframes float-up {
        from {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        to {
          transform: translateY(-10vh) rotate(360deg);
          opacity: 0;
        }
      }

      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      /* Smooth transitions for all interactive elements */
      .module-box {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .module-box .nav-button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Performance optimizations */
      .module-box:hover {
        will-change: transform;
      }

      .module-box:not(:hover) {
        will-change: auto;
      }
    `;
    document.head.appendChild(style);
  }
  
  console.log('[animation-controller] Optimized Animation Controller loaded');
})();