import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './_app';
import { AppProps } from 'next/app';
import { Router } from 'next/router';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('App Component', () => {
  const mockPageProps: AppProps = {
    pageProps: {},
    Component: () => <div>Test Component</div>,
    router: {} as Router,
  };

  it('renders Layout and Component', () => {
    render(<App {...mockPageProps} />);

    // Check if Layout is rendered
    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();

    // Check if Component is rendered
    const testComponent = screen.getByText('Test Component');
    expect(testComponent).toBeInTheDocument();
  });
});
