import * as THREE from "three";

/**
 * A utility class to preload Three.js assets (textures, models, etc.)
 */
class ThreeJSPreloader {
  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.loadedAssets = {};
    this._isLoaded = false;

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
   * Preload textures needed for the hexagonal grid
   * @param {Array} textureUrls - Array of texture URLs to preload
   * @returns {Promise} A promise that resolves when all textures are loaded
   */
  preloadTextures(textureUrls) {
    return new Promise((resolve, reject) => {
      this.onLoad = resolve;
      this.onError = reject;

      textureUrls.forEach((url) => {
        const texture = this.textureLoader.load(url);
        this.loadedAssets[url] = texture;
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
}

// Create a singleton instance
const preloader = new ThreeJSPreloader();
export default preloader;
