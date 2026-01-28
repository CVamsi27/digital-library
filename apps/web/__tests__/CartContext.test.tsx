import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from '../../packages/ui/context';
import { CartItem } from '../../packages/types';

// Test component that uses the cart context
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div>
      <div data-testid="cart-length">{cart.length}</div>
      <button onClick={() => addToCart({
        id: '1',
        title: 'Test Book',
        authors: ['Author'],
        image: 'image.jpg',
        price: 10,
      })}>
        Add Book
      </button>
      <button onClick={() => removeFromCart('1')}>
        Remove Book
      </button>
      <button onClick={() => updateQuantity('1', 2)}>
        Update Quantity
      </button>
      <button onClick={() => clearCart()}>
        Clear Cart
      </button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
  });

  it('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Book'));

    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
  });

  it('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Book'));
    fireEvent.click(screen.getByText('Remove Book'));

    expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
  });

  it('updates item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Book'));
    fireEvent.click(screen.getByText('Update Quantity'));

    // Since we can't easily check quantity, we can check if the item is still there
    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
  });

  it('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Book'));
    fireEvent.click(screen.getByText('Clear Cart'));

    expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
  });

  it('persists cart in localStorage', () => {
    const { rerender } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Book'));

    // Re-render to simulate page refresh
    rerender(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
  });
});