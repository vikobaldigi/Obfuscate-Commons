// glossary-connector.js - Handles dynamic interactions between modules and glossary
// This script should be loaded on all module pages

(function() {
  'use strict';
  
  console.log('[glossary-connector] Initializing glossary connections...');
  
  // Enhanced link click handling
  function handleGlossaryLinkClick(event) {
    const link = event.target.closest('a[href*="glossary.html"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    const term = link.dataset.term || link.textContent.trim();
    
    console.log(`[glossary-connector] Glossary link clicked: ${term}`);
    
    // Add visual feedback
    link.style.transform = 'scale(0.95)';
    link.style.opacity = '0.7';
    
    setTimeout(() => {
      link.style.transform = '';
      link.style.opacity = '';
    }, 200);
    
    // If opening in same tab, send message to glossary page
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
      // Store the clicked term info for the glossary page
      sessionStorage.setItem('glossary-highlight-term', JSON.stringify({
        term: term,
        timestamp: Date.now(),
        sourceModule: document.querySelector('meta[name="module"]')?.content || 'unknown'
      }));
    }
    
    return true;
  }
  
  // Add ripple effect to glossary links
  function addRippleEffect(link) {
    link.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(217, 179, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
      `;
      
      // Add ripple animation if not already present
      if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
          .glossary-link {
            position: relative;
            overflow: hidden;
            text-decoration: none;
            color: #d9b3ff;
            border-bottom: 1px dotted #9f70ff;
            transition: all 0.3s ease;
            padding: 0 2px;
          }
          .glossary-link:hover {
            color: #ffffff;
            border-bottom-color: #d9b3ff;
            background-color: rgba(159, 112, 255, 0.1);
          }
          .glossary-link:active {
            transform: translateY(1px);
          }
        `;
        document.head.appendChild(style);
      }
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }
  
  // Enhanced link styling and behavior
  function enhanceGlossaryLinks() {
    const links = document.querySelectorAll('a[href*="glossary.html"]');
    
    links.forEach(link => {
      // Add glossary-link class if not present
      if (!link.classList.contains('glossary-link')) {
        link.classList.add('glossary-link');
      }
      
      // Add ripple effect
      addRippleEffect(link);
      
      // Add tooltip with term information
      const term = link.dataset.term || link.textContent.trim();
      link.title = `View "${term}" in glossary`;
      
      // Add data attributes for better tracking
      if (!link.dataset.term) {
        link.dataset.term = term;
      }
      
      // Add module context
      const currentModule = document.querySelector('meta[name="module"]')?.content;
      if (currentModule) {
        link.dataset.sourceModule = currentModule;
      }
    });
    
    console.log(`[glossary-connector] Enhanced ${links.length} glossary links`);
  }
  
  // Monitor for new glossary links (for dynamic content)
  function observeNewLinks() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            const newLinks = node.querySelectorAll ? node.querySelectorAll('a[href*="glossary.html"]') : [];
            if (newLinks.length > 0) {
              console.log(`[glossary-connector] Found ${newLinks.length} new glossary links`);
              enhanceGlossaryLinks();
            }
            
            // Check if the node itself is a glossary link
            if (node.matches && node.matches('a[href*="glossary.html"]')) {
              enhanceGlossaryLinks();
            }
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return observer;
  }
  
  // Add keyboard shortcuts for glossary navigation
  function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
      // Ctrl/Cmd + G = Open glossary
      if ((event.ctrlKey || event.metaKey) && event.key === 'g') {
        event.preventDefault();
        const glossaryUrl = getGlossaryUrl();
        window.open(glossaryUrl, '_blank');
        console.log('[glossary-connector] Opened glossary via keyboard shortcut');
      }
      
      // Ctrl/Cmd + Shift + G = Open glossary in same tab
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'G') {
        event.preventDefault();
        const glossaryUrl = getGlossaryUrl();
        window.location.href = glossaryUrl;
      }
    });
  }
  
  // Get the correct glossary URL based on current page location
  function getGlossaryUrl() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    
    // Determine relative path to glossary
    if (pathParts.includes('modules')) {
      // We're in a module subdirectory
      return '../glossary/glossary.html';
    } else if (pathParts.includes('docs')) {
      // We're in docs root
      return 'modules/glossary/glossary.html';
    } else {
      // Fallback - assume we need to go up to find docs
      return '../../modules/glossary/glossary.html';
    }
  }
  
  // Add breadcrumb navigation enhancement
  function enhanceBreadcrumbs() {
    const breadcrumbs = document.querySelectorAll('.nav-button, a[href*="index.html"]');
    breadcrumbs.forEach(crumb => {
      crumb.addEventListener('click', function(e) {
        // Clear any stored glossary highlight when navigating away
        sessionStorage.removeItem('glossary-highlight-term');
      });
    });
  }
  
  // Analytics and usage tracking (privacy-friendly)
  function trackGlossaryUsage() {
    let clickCount = parseInt(localStorage.getItem('glossary-clicks') || '0');
    let lastModule = localStorage.getItem('glossary-last-module') || '';
    const currentModule = document.querySelector('meta[name="module"]')?.content || 'unknown';
    
    document.addEventListener('click', function(event) {
      if (event.target.closest('a[href*="glossary.html"]')) {
        clickCount++;
        localStorage.setItem('glossary-clicks', clickCount.toString());
        localStorage.setItem('glossary-last-module', currentModule);
        
        console.log(`[glossary-connector] Total glossary clicks: ${clickCount}, from module: ${currentModule}`);
      }
    });
  }
  
  // Add visual connection indicators
  function addVisualIndicators() {
    const style = document.createElement('style');
    style.id = 'glossary-connector-styles';
    style.textContent = `
      /* Enhanced glossary link styles */
      .glossary-link::before {
        content: "📖";
        font-size: 0.8em;
        margin-right: 0.2em;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .glossary-link:hover::before {
        opacity: 0.7;
      }
      
      /* Module connection indicator */
      .module-connected::after {
        content: " 🔗";
        font-size: 0.7em;
        opacity: 0.5;
        margin-left: 0.3em;
      }
      
      /* Pulse animation for newly linked terms */
      .newly-linked {
        animation: pulse-highlight 2s ease-out;
      }
      
      @keyframes pulse-highlight {
        0%, 100% { background-color: transparent; }
        50% { background-color: rgba(159, 112, 255, 0.1); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initialize all connector functionality
  function initialize() {
    console.log('[glossary-connector] Starting initialization...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
      return;
    }
    
    try {
      // Add event listeners
      document.addEventListener('click', handleGlossaryLinkClick);
      
      // Enhance existing links
      enhanceGlossaryLinks();
      
      // Set up observers and enhancements
      observeNewLinks();
      addKeyboardShortcuts();
      enhanceBreadcrumbs();
      trackGlossaryUsage();
      addVisualIndicators();
      
      // Mark page as glossary-connected
      document.body.classList.add('glossary-connected');
      
      console.log('[glossary-connector] Initialization complete');
      
      // Debug info
      const currentModule = document.querySelector('meta[name="module"]')?.content;
      const linkCount = document.querySelectorAll('a[href*="glossary.html"]').length;
      console.log(`[glossary-connector] Module: ${currentModule}, Links: ${linkCount}`);
      
    } catch (error) {
      console.error('[glossary-connector] Initialization error:', error);
    }
  }
  
  // Start initialization
  initialize();
  
  // Export functions for external use
  window.GlossaryConnector = {
    enhanceLinks: enhanceGlossaryLinks,
    getGlossaryUrl: getGlossaryUrl,
    version: '1.0.0'
  };
  
})();