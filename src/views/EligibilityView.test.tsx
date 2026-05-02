import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EligibilityView from './EligibilityView';
import { LanguageProvider } from '../contexts/LanguageContext';

describe('EligibilityView', () => {
  it('renders correctly and starts with the first question', () => {
    render(
      <LanguageProvider>
        <EligibilityView />
      </LanguageProvider>
    );
    expect(screen.getByText(/Are you an Indian citizen/i)).toBeDefined();
  });

  it('completes the eligibility flow', async () => {
    render(
      <LanguageProvider>
        <EligibilityView />
      </LanguageProvider>
    );

    // Step 1: Citizenship
    fireEvent.click(screen.getByText(/Yes/i));

    // Step 2: DOB
    const dateInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });
    fireEvent.click(screen.getByText(/Next/i));

    // Step 3: State
    const stateSelect = screen.getByLabelText(/Select your state/i);
    fireEvent.change(stateSelect, { target: { value: 'Delhi' } });

    // Step 4: Voter Roll
    expect(screen.getByText(/Is your name on the Electoral Roll/i)).toBeDefined();
    fireEvent.click(screen.getAllByText(/Yes/i)[0]);

    // Step 5: ID Check
    expect(screen.getByText(/Do you have a valid Voter ID/i)).toBeDefined();
    fireEvent.click(screen.getAllByText(/Yes/i)[0]);

    // Step 6: Result
    expect(screen.getByText(/You're set/i)).toBeDefined();
  });
});
