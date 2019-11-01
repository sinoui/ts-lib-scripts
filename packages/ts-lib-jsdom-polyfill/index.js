if (typeof window !== 'undefined') {
  window.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16);
  };
  window.cancelAnimationFrame = (rafId) => {
    clearTimeout(rafId);
  };
}
