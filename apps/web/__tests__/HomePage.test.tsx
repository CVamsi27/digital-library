import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from '../../packages/ui/components/home/home-page';
import { useRouter } from 'next/navigation';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('HomePage', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the home page with title and button', () => {
    render(<HomePage />);

    expect(screen.getByText('Digital Library')).toBeInTheDocument();
    expect(screen.getByText('Browse Categories')).toBeInTheDocument();
  });

  it('navigates to categories when button is clicked', () => {
    render(<HomePage />);

    const button = screen.getByText('Browse Categories');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/categories');
  });

  it('displays gradient text for title', () => {
    render(<HomePage />);

    const title = screen.getByText('Digital Library');
    expect(title).toHaveClass('bg-gradient-to-r', 'from-blue-500', 'to-pink-500');
  });
});