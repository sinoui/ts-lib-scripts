if (typeof window !== 'undefined') {
  const raf = window.requestAnimationFrame;
  const cancelRaf = window.cancelAnimationFrame;

  beforeEach(() => {
    window.requestAnimationFrame = (callback) => {
      return setTimeout(callback);
    };
    window.cancelAnimationFrame = (rafId) => {
      clearTimeout(rafId);
    };
  });

  afterEach(() => {
    window.requestAnimationFrame = raf;
    window.cancelAnimationFrame = cancelRaf;
  });
}
