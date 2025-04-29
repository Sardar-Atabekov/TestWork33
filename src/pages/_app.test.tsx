import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './_app';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { useEffect } from 'react';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock dynamic import
jest.mock('bootstrap/dist/js/bootstrap.bundle.min.js', () => ({}), {
  virtual: true,
});

// Extend Window interface
declare global {
  interface Window {
    import: (module: string) => Promise<any>;
  }
}

describe('App Component', () => {
  const mockPageProps: AppProps = {
    pageProps: {},
    Component: () => <div>Test Component</div>,
    router: {} as Router,
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders Layout and Component', () => {
    render(<App {...mockPageProps} />);

    // Check if Layout is rendered
    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();

    // Check if Component is rendered
    const testComponent = screen.getByText('Test Component');
    expect(testComponent).toBeInTheDocument();
  });

  it('loads Bootstrap CSS', () => {
    // Create a mock link element
    const mockLink = document.createElement('link');
    mockLink.rel = 'stylesheet';
    mockLink.href = 'bootstrap/dist/css/bootstrap.min.css';
    document.head.appendChild(mockLink);

    render(<App {...mockPageProps} />);

    // Check if Bootstrap CSS is loaded
    const bootstrapCSS = document.querySelector(
      'link[href="bootstrap/dist/css/bootstrap.min.css"]'
    );
    expect(bootstrapCSS).toBeInTheDocument();
  });

  it('initializes Bootstrap JS in browser environment', () => {
    // Mock useEffect
    const mockUseEffect = jest.spyOn(require('react'), 'useEffect');

    render(<App {...mockPageProps} />);

    // Check if useEffect was called
    expect(mockUseEffect).toHaveBeenCalled();

    // Get the effect callback
    const effectCallback = mockUseEffect.mock.calls[0][0] as () => void;

    // Call the effect callback
    effectCallback();

    // Verify that the effect tried to import Bootstrap
    expect(require('bootstrap/dist/js/bootstrap.bundle.min.js')).toBeDefined();
  });
});
