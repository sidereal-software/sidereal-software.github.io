import '@testing-library/jest-dom/vitest'

// jsdom does not implement the browser observation APIs Embla (the testimonial
// carousel) relies on.
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: ObserverStub,
})
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ObserverStub,
})

// jsdom does not implement matchMedia, which Embla (the testimonial carousel)
// uses for breakpoint-scoped options.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList,
})
