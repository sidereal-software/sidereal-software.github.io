import '@testing-library/jest-dom/vitest'
import { Globals } from '@react-spring/web'

// Springs settle instantly so assertions see the end state.
Globals.assign({ skipAnimation: true })
