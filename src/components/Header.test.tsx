import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { LanguageProvider } from '../contexts/LanguageContext';

describe('Header Component', () => {
  it('renders the application name', () => {
    render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
    
    // Check if the app name "VoteSmartIndia" is rendered
    expect(screen.getByText(/VoteSmartIndia/)).toBeInTheDocument();
  });

  it('renders the language toggle button', () => {
    render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
    
    // Initially the button should say 'हिंदी' as default language is English
    const button = screen.getByRole('button', { name: /switch to hindi/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('हिंदी');
  });
});
