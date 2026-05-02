import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuizView from './QuizView';
import { LanguageProvider } from '../contexts/LanguageContext';

// Mock confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

describe('QuizView', () => {
  it('renders intro screen and starts the quiz', () => {
    render(
      <LanguageProvider>
        <QuizView />
      </LanguageProvider>
    );
    expect(screen.getByText(/Voter IQ Quiz/i)).toBeDefined();
    const startBtn = screen.getByLabelText(/Start Quiz/i);
    fireEvent.click(startBtn);
    expect(screen.getByText(/Question 1\/10/i)).toBeDefined();
  });

  it('calculates score correctly (mocking first answer)', async () => {
    render(
      <LanguageProvider>
        <QuizView />
      </LanguageProvider>
    );

    // Start
    fireEvent.click(screen.getByLabelText(/Start Quiz/i));

    // Q1: Section 128 (Correct)
    const correctOption = screen.getByText(/Section 128 of the Representation of the People Act/i);
    fireEvent.click(correctOption);

    // Check score updated in status bar (role=status/polite)
    await waitFor(() => {
        expect(screen.getByText(/Score: 10/i)).toBeDefined();
    });
  });
});
