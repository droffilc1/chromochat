import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SignupPage from '../app/signup/page';

describe('SignupPage', () => {
  it('renders the signup form', () => {
    render(<SignupPage />);

    // Check for the title
    const title = screen.getByText(/create your account/i);
    expect(title).toBeInTheDocument();

    // Check for the Full name input
    const fullNameInput = screen.getByLabelText(/full name/i);
    expect(fullNameInput).toBeInTheDocument();

    // Check for the Email input
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });
});
