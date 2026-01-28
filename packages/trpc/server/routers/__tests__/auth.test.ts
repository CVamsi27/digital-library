import { createTRPCContext } from '../trpc';
import { appRouter } from '../index';

const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

jest.mock('../../../prisma', () => ({
  default: mockPrisma,
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import bcrypt from 'bcryptjs';

const createCaller = async () => {
  const ctx = await createTRPCContext({ req: {} as any, res: {} as any });
  return appRouter.createCaller(ctx);
};

describe('Auth Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const caller = await createCaller();
      const input = { username: 'testuser', email: 'test@example.com', password: 'password123' };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        username: input.username,
        email: input.email,
        password: 'hashedpassword',
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

      const result = await caller.auth.register(input);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: input.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          username: input.username,
          email: input.email,
          password: 'hashedpassword',
          provider: 'credentials',
        },
      });
      expect(result).toEqual({ success: true });
    });

    it('should throw error if user already exists', async () => {
      const caller = await createCaller();
      const input = { username: 'testuser', email: 'test@example.com', password: 'password123' };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1 });

      await expect(caller.auth.register(input)).rejects.toThrow('User already exists');
    });

    it('should handle bcrypt hash failure', async () => {
      const caller = await createCaller();
      const input = { username: 'testuser', email: 'test@example.com', password: 'password123' };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hash failed'));

      await expect(caller.auth.register(input)).rejects.toThrow('Hash failed');
    });

    it('should handle database create failure', async () => {
      const caller = await createCaller();
      const input = { username: 'testuser', email: 'test@example.com', password: 'password123' };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (mockPrisma.user.create as jest.Mock).mockRejectedValue(new Error('DB error'));

      await expect(caller.auth.register(input)).rejects.toThrow('DB error');
    });
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const caller = await createCaller();
      const input = { email: 'test@example.com', password: 'password123' };

      const user = {
        id: 1,
        email: input.email,
        password: 'hashedpassword',
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await caller.auth.login(input);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: input.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(input.password, user.password);
      expect(result).toEqual({ success: true });
    });

    it('should throw error for invalid credentials', async () => {
      const caller = await createCaller();
      const input = { email: 'test@example.com', password: 'wrongpassword' };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(caller.auth.login(input)).rejects.toThrow('Invalid credentials');
    });

    it('should throw error for wrong password', async () => {
      const caller = await createCaller();
      const input = { email: 'test@example.com', password: 'wrongpassword' };

      const user = {
        id: 1,
        email: input.email,
        password: 'hashedpassword',
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(caller.auth.login(input)).rejects.toThrow('Invalid credentials');
    });

    it('should handle user without password', async () => {
      const caller = await createCaller();
      const input = { email: 'test@example.com', password: 'password123' };

      const user = {
        id: 1,
        email: input.email,
        password: null, // OAuth user
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      await expect(caller.auth.login(input)).rejects.toThrow('Invalid credentials');
    });
  });
});