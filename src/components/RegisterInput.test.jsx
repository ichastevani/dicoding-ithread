import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterInput from '../components/RegisterInput';

describe('RegisterInput', () => {
  it('should render the RegisterInput form with inputs and button', () => {
    // Arrange: Mocking the register function
    const registerMock = vi.fn();

    // Render the component
    render(<RegisterInput register={registerMock} />);

    // Assert: Check if the title, subtitle, inputs, and button are rendered
    expect(screen.getByRole('heading', { level: 2, name: 'Join IThread' })).to.exist;
    expect(screen.getByPlaceholderText('Full Name')).to.exist;
    expect(screen.getByPlaceholderText('Email')).to.exist;
    expect(screen.getByPlaceholderText('Password')).to.exist;
    expect(screen.getByText('REGISTER')).to.exist;
  });

  it('should call register function when form is submitted', async () => {
    // Arrange: Mocking the register function
    const registerMock = vi.fn();
    render(<RegisterInput register={registerMock} />);

    // Act: Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Act: Submit the form
    fireEvent.click(screen.getByText('REGISTER'));

    // Assert: Check if register function is called with correct arguments
    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    });
  });

  it('should not call register function when form is not filled correctly', async () => {
    // Arrange: Mocking the register function
    const registerMock = vi.fn();
    render(<RegisterInput register={registerMock} />);

    // Act: Submit the form without filling any input
    fireEvent.click(screen.getByText('REGISTER'));

    // Assert: Ensure register function is not called
    await waitFor(() => {
      expect(registerMock).not.toHaveBeenCalled();
    });
  });
});
