import '@testing-library/jest-dom/vitest'
import { Globals } from '@react-spring/web'

// Springs settle instantly so assertions see the end state.
Globals.assign({ skipAnimation: true })

// jsdom lacks ResizeObserver, which Monument's fit-text hook uses to refit on resize.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverStub,
})
