import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BottomNav from './BottomNav';
import { LanguageProvider } from '../contexts/LanguageContext';

describe('BottomNav Component', () => {
  it('renders all navigation buttons', () => {
    const mockSetActiveTab = vi.fn();
    
    render(
      <LanguageProvider>
        <BottomNav activeTab="home" setActiveTab={mockSetActiveTab} />
      </LanguageProvider>
    );
    
    // There are 6 navigation items
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
    
    // Verify aria-labels are present
    expect(screen.getByLabelText('Navigate to Home')).toBeInTheDocument();
  });
});
