// /docs/js/animation-controller.js
// Ultra-Modern Animation Controller for Obfuscate-OS v3.0

class UltraModernAnimationController {
  constructor() {
    this.isLoaded = false;
    this.animationQueue = [];
    this.performanceMode = this.detectPerformanceMode();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observers = new Map();
    this.rafId = null;
    this.particles = [];
    
    this.init();
  }

  detectPerformanceMode() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const lowEnd = /Android.*Chrome\/[0-5]/.test(navigator.userAgent);
    
    return slowConnection || lowMemory || lowEnd ? 'low' : 'high';
  }

  async init() {
    console.log('[animation-controller] Initializing Ultra-Modern Animation System...');
    
    if (this.reducedMotion) {
      this.skipAnimations();
      return;
    }

    // ENHANCED: Sophisticated loading sequence
    await this.preloadCriticalResources();
    await this.initializeParticleSystem();
    await this.startLoadingSequence();
    
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupPerformanceMonitoring();
  }

  async preloadCriticalResources() {
    // Preload fonts and critical CSS
    const fontPromises = [
      document.fonts.load('12px "SF Mono"'),
      document.fonts.load('12px system-ui')
    ];

    try {
      await Promise.allSettled(fontPromises);
      console.log('[animation-controller] Fonts preloaded successfully');
    } catch (error) {
      console.warn('[animation-controller] Font preloading failed:', error);
    }
  }

  async initializeParticleSystem() {
    if (this.performanceMode === 'low') {
      console.log('[animation-controller] Skipping particles for low-performance mode');
      return;
    }

    // Create advanced floating particles
    const particleContainer = document.createElement('div');
    particleContainer.id = 'advanced-particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -2;
      overflow: hidden;
    `;

    // Create staggered particles
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        this.createFloatingParticle(particleContainer);
      }, i * 400);
    }

    document.body.appendChild(particleContainer);

    // Continue creating particles periodically
    this.particleInterval = setInterval(() => {
      if (document.hidden) return;
      this.createFloatingParticle(particleContainer);
    }, 3000);
  }

  createFloatingParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const opacity = Math.random() * 0.4 + 0.1;
    const duration = Math.random() * 8 + 12;
    const delay = Math.random() * 2;
    
    particle.className = 'advanced-particle';
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(159, 112, 255, ${opacity}), transparent);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      animation: float-advanced-particle ${duration}s linear infinite;
      animation-delay: ${delay}s;
      pointer-events: none;
    `;

    container.appendChild(particle);
    this.particles.push(particle);

    // Clean up after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
        const index = this.particles.indexOf(particle);
        if (index > -1) {
          this.particles.splice(index, 1);
        }
      }
    }, (duration + delay) * 1000);
  }

  async startLoadingSequence() {
    const loadingSpinner = document.getElementById('loading-spinner');
    const body = document.body;
    const shell = document.querySelector('.shell');
    const header = document.querySelector('#terminal-header');
    const grid = document.querySelector('#module-grid');
    const footer = document.querySelector('#site-footer');
    const scrollProgress = document.querySelector('#scroll-progress');

    // ENHANCED: Sophisticated timing sequence
    const sequence = [
      { 
        delay: 100, 
        action: () => {
          body.classList.add('loaded');
          console.log('[animation-controller] Body loaded');
        }
      },
      { 
        delay: 300, 
        action: () => {
          if (shell) shell.classList.add('visible');
          console.log('[animation-controller] Shell visible');
        }
      },
      { 
        delay: 500, 
        action: () => {
          if (header) header.classList.add('visible');
          console.log('[animation-controller] Header visible');
        }
      },
      { 
        delay: 800, 
        action: () => {
          if (grid) {
            grid.classList.add('visible');
            this.animateModuleCards();
          }
          console.log('[animation-controller] Grid visible, animating cards');
        }
      },
      { 
        delay: 1400, 
        action: () => {
          if (footer) footer.classList.add('visible');
          console.log('[animation-controller] Footer visible');
        }
      },
      { 
        delay: 1600, 
        action: () => {
          if (scrollProgress) scrollProgress.classList.add('visible');
          if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
            setTimeout(() => loadingSpinner.remove(), 500);
          }
          console.log('[animation-controller] Loading sequence complete');
        }
      }
    ];

    for (const step of sequence) {
      await this.delay(step.delay);
      step.action();
    }

    this.isLoaded = true;
    this.processAnimationQueue();
  }

  async animateModuleCards() {
    const cards = document.querySelectorAll('.module-box');
    
    if (cards.length === 0) {
      console.warn('[animation-controller] No module cards found');
      return;
    }

    console.log(`[animation-controller] Animating ${cards.length} module cards`);
    
    // ENHANCED: Sophisticated staggered animation
    cards.forEach((card, index) => {
      // Calculate stagger with wave effect
      const row = Math.floor(index / 3);
      const col = index % 3;
      const staggerDelay = (row * 150) + (col * 100) + (Math.sin(index * 0.3) * 50);
      
      setTimeout(() => {
        card.classList.add('visible');
        
        // Add subtle bounce effect for high-performance mode
        if (this.performanceMode === 'high') {
          setTimeout(() => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            setTimeout(() => {
              card.style.transform = 'translateY(0) scale(1)';
            }, 200);
          }, 400);
        }
      }, staggerDelay);
    });
  }

  setupEventListeners() {
    // ENHANCED: Scroll progress with momentum
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        this.updateScrollProgress();
        this.handleParallaxEffects();
      }, 10);
    }, { passive: true });

    // ENHANCED: Mouse tracking for all interactive elements
    this.setupMouseTracking();
    
    // ENHANCED: Keyboard shortcuts
    this.setupKeyboardShortcuts();

    // ENHANCED: Visibility change handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }

  setupMouseTracking() {
    // Header mouse tracking
    const header = document.querySelector('#terminal-header');
    if (header) {
      header.addEventListener('mousemove', (e) => {
        this.updateMousePosition(header, e);
      });
      header.addEventListener('mouseleave', () => {
        this.clearMousePosition(header);
      });
    }

    // Module cards mouse tracking and click effects
    document.addEventListener('click', (e) => {
      if (e.target.closest('.module-box')) {
        this.createRippleEffect(e.target.closest('.module-box'), e);
      }
    });

    // Setup mouse tracking for all module boxes
    document.querySelectorAll('.module-box').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        this.updateMousePosition(card, e);
      });
      
      card.addEventListener('mouseleave', () => {
        this.clearMousePosition(card);
      });
    });
  }

  updateMousePosition(element, event) {
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

  createRippleEffect(element, event) {
    if (this.performanceMode === 'low') return;

    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(159, 112, 255, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 800);
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
      // Ctrl/Cmd + K for first module
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const firstModule = document.querySelector('.module-box .nav-button');
        if (firstModule) {
          this.animateClick(firstModule);
          setTimeout(() => firstModule.click(), 150);
        }
      }

      // Escape to scroll to top with animation
      if (event.key === 'Escape') {
        event.preventDefault();
        this.animatedScrollToTop();
      }

      // Arrow key navigation
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        this.handleArrowNavigation(event);
      }
    });
  }

  handleArrowNavigation(event) {
    const modules = Array.from(document.querySelectorAll('.module-box'));
    const focused = document.activeElement;
    const currentIndex = modules.findIndex(module => 
      module === focused || module.contains(focused)
    );

    if (currentIndex !== -1) {
      event.preventDefault();
      let nextIndex;
      
      switch(event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = (currentIndex + 1) % modules.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex = (currentIndex - 1 + modules.length) % modules.length;
          break;
      }
      
      const nextModule = modules[nextIndex];
      nextModule.focus();
      nextModule.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Visual feedback
      this.highlightElement(nextModule);
    }
  }

  highlightElement(element) {
    const originalTransform = element.style.transform;
    element.style.transform = 'scale(1.05)';
    element.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
      element.style.transform = originalTransform;
    }, 200);
  }

  animateClick(element) {
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 150);
  }

  animatedScrollToTop() {
    // Add visual feedback
    const progress = document.querySelector('#scroll-progress');
    if (progress) {
      progress.style.background = 'linear-gradient(90deg, #ff6b6b, #feca57, #48cae4, #9c88ff)';
      progress.style.height = '6px';
    }
    
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });

    // Reset progress bar after scroll
    setTimeout(() => {
      if (progress) {
        progress.style.background = '';
        progress.style.height = '4px';
      }
    }, 1000);
  }

  updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.querySelector('#scroll-progress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  }

  handleParallaxEffects() {
    if (this.performanceMode === 'low') return;

    const scrolled = window.pageYOffset;
    const header = document.querySelector('#terminal-header');
    
    if (header) {
      const rate = scrolled * -0.03;
      header.style.transform = `translateY(${rate}px)`;
    }

    // Subtle particle movement based on scroll
    this.particles.forEach(particle => {
      if (particle.parentNode) {
        const offset = scrolled * 0.05;
        particle.style.transform = `translateX(${offset}px)`;
      }
    });
  }

  setupIntersectionObserver() {
    if (!window.IntersectionObserver) {
      // Fallback for older browsers
      document.querySelectorAll('.content-section, .fade-in-up').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Enhanced animation for special elements
          if (entry.target.classList.contains('module-box')) {
            setTimeout(() => {
              this.enhanceModuleCard(entry.target);
            }, 100);
          }
          
          // Clean up will-change after animation
          setTimeout(() => {
            entry.target.classList.add('animation-complete');
            entry.target.style.willChange = 'auto';
          }, 800);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements that need scroll-triggered animations
    document.querySelectorAll('.content-section, .fade-in-up, .scroll-fade').forEach(el => {
      observer.observe(el);
    });

    this.observers.set('intersection', observer);
  }

  enhanceModuleCard(card) {
    if (this.performanceMode === 'low') return;

    // Add subtle breathing animation
    card.style.animation = 'breathe 4s ease-in-out infinite';
    
    // Add enhanced hover detection
    let hoverTimeout;
    card.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      card.style.animationPlayState = 'paused';
    });
    
    card.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        card.style.animationPlayState = 'running';
      }, 1000);
    });
  }

  setupPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();

    const monitor = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Adjust quality based on performance
        if (fps < 30 && this.performanceMode !== 'low') {
          console.warn('[animation-controller] Low FPS detected, reducing animation complexity');
          this.performanceMode = 'low';
          this.optimizeForLowPerformance();
        }
      }
      
      if (!document.hidden) {
        this.rafId = requestAnimationFrame(monitor);
      }
    };

    this.rafId = requestAnimationFrame(monitor);
  }

  optimizeForLowPerformance() {
    // Remove particles
    this.particles.forEach(particle => {
      if (particle.parentNode) {
        particle.remove();
      }
    });
    this.particles = [];

    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }

    // Simplify animations
    document.body.classList.add('low-performance-mode');
    
    const style = document.createElement('style');
    style.textContent = `
      .low-performance-mode .module-box {
        transition-duration: 0.2s !important;
      }
      .low-performance-mode .advanced-particle {
        display: none !important;
      }
      .low-performance-mode #terminal-header h1 {
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  skipAnimations() {
    console.log('[animation-controller] Reduced motion detected, skipping animations');
    
    document.body.classList.add('loaded', 'no-animations');
    
    // Make everything visible immediately
    const elements = [
      '.shell',
      '#terminal-header', 
      '#module-grid',
      '#site-footer',
      '#scroll-progress',
      '.module-box'
    ];
    
    elements.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('visible');
      });
    });

    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
      loadingSpinner.remove();
    }

    this.isLoaded = true;
  }

  pauseAnimations() {
    document.body.style.animationPlayState = 'paused';
    this.particles.forEach(particle => {
      if (particle.style.animationPlayState !== undefined) {
        particle.style.animationPlayState = 'paused';
      }
    });
  }

  resumeAnimations() {
    document.body.style.animationPlayState = 'running';
    this.particles.forEach(particle => {
      if (particle.style.animationPlayState !== undefined) {
        particle.style.animationPlayState = 'running';
      }
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  processAnimationQueue() {
    while (this.animationQueue.length > 0) {
      const animation = this.animationQueue.shift();
      animation();
    }
  }

  queueAnimation(fn) {
    if (this.isLoaded) {
      fn();
    } else {
      this.animationQueue.push(fn);
    }
  }

  // Public methods for external control
  disableAnimations() {
    document.body.classList.add('no-animations');
    
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Cancel animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    console.log('[animation-controller] Animations disabled');
  }

  enableAnimations() {
    document.body.classList.remove('no-animations');
    this.setupIntersectionObserver();
    console.log('[animation-controller] Animations enabled');
  }

  // Debug and utility methods
  createTestRipple(x = 400, y = 300) {
    const testElement = document.createElement('div');
    testElement.style.cssText = `
      position: fixed;
      top: ${y}px;
      left: ${x}px;
      width: 100px;
      height: 100px;
      background: rgba(159, 112, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(testElement);
    
    this.createRippleEffect(testElement, { 
      clientX: x, 
      clientY: y,
      target: testElement 
    });
    
    setTimeout(() => testElement.remove(), 1000);
  }

  getStats() {
    return {
      performanceMode: this.performanceMode,
      reducedMotion: this.reducedMotion,
      isLoaded: this.isLoaded,
      particleCount: this.particles.length,
      observerCount: this.observers.size
    };
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.animationController = new UltraModernAnimationController();
  
  // Export for debugging
  window.UltraModernAnimationController = UltraModernAnimationController;
  
  console.log('[animation-controller] Ultra-Modern Animation Controller loaded');
});

// Handle visibility change to pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
  if (window.animationController) {
    if (document.hidden) {
      window.animationController.pauseAnimations();
    } else {
      window.animationController.resumeAnimations();
    }
  }
});

// Export for potential manual control
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UltraModernAnimationController;
}