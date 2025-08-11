import '@testing-library/jest-dom';
import 'whatwg-fetch';

import 'web-streams-polyfill/polyfill';

import './tests/mocks/setupMocks';

import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

class BroadcastChannel {
  name: string;
  onmessage: ((event: MessageEvent) => void) | null = null;
  constructor(name: string) {
    this.name = name;
  }
  postMessage() {}
  close() {}
}
global.BroadcastChannel = BroadcastChannel as unknown as typeof window.BroadcastChannel;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  })
});

import { server } from './tests/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
