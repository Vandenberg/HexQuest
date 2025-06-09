import * as THREE from "three";

/**
 * A utility class to preload Three.js assets (textures, models, etc.)
 * with optimized caching and memory management
 */
class ThreeJSPreloader {
  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.loadedAssets = {};
    this._isLoaded = false;
    this._loadQueue = []; // Track what's in the loading queue
    this.progress = 0;

    // Set up event callbacks
    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.progress = itemsLoaded / itemsTotal;
      if (this.onProgress) {
        this.onProgress(this.progress);
      }
    };

    this.loadingManager.onLoad = () => {
      this._isLoaded = true;
      if (this.onLoad) {
        this.onLoad();
      }
    };

    this.loadingManager.onError = (url) => {
      console.error(`Error loading asset: ${url}`);
      if (this.onError) {
        this.onError(url);
      }
    };
  }

  /**
   * Preload textures needed for the hexagonal grid with caching
   * @param {Array} textureUrls - Array of texture URLs to preload
   * @returns {Promise} A promise that resolves when all textures are loaded
   */
  preloadTextures(textureUrls) {
    return new Promise((resolve, reject) => {
      // Filter out already loaded textures to prevent duplicative loading
      const urlsToLoad = textureUrls.filter((url) => !this.loadedAssets[url]);

      // If everything's already loaded, return immediately
      if (urlsToLoad.length === 0) {
        this.progress = 1;
        if (this.onProgress) this.onProgress(1);
        resolve();
        return;
      }

      this.onLoad = resolve;
      this.onError = reject;
      this._loadQueue = urlsToLoad;

      // Configure texture properties for better performance
      urlsToLoad.forEach((url) => {
        const texture = this.textureLoader.load(
          url,
          // Success callback - optimize the texture on load
          (loadedTexture) => {
            // Configure texture for better GPU performance
            loadedTexture.generateMipmaps = false;
            loadedTexture.minFilter = THREE.LinearFilter;
            loadedTexture.magFilter = THREE.LinearFilter;
            loadedTexture.needsUpdate = true;

            // Store in cache
            this.loadedAssets[url] = loadedTexture;

            // Remove from queue
            const index = this._loadQueue.indexOf(url);
            if (index > -1) {
              this._loadQueue.splice(index, 1);
            }
          }
        );
      });
    });
  }

  /**
   * Get a preloaded texture by URL
   * @param {string} url - The URL of the texture
   * @returns {THREE.Texture} The preloaded texture or null if not found
   */
  getTexture(url) {
    return this.loadedAssets[url] || null;
  }

  /**
   * Check if all assets have been loaded
   * @returns {boolean} True if all assets are loaded
   */
  isLoaded() {
    return this._isLoaded;
  }

  /**
   * Dispose of textures and free memory
   * @param {Array} urls - Optional array of texture URLs to dispose, or all if not provided
   */
  disposeTextures(urls) {
    const urlsToDispose = urls || Object.keys(this.loadedAssets);

    urlsToDispose.forEach((url) => {
      const texture = this.loadedAssets[url];
      if (texture) {
        texture.dispose();
        delete this.loadedAssets[url];
      }
    });
  }
}

// Create a singleton instance
const preloader = new ThreeJSPreloader();
export default preloader;
