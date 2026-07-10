import { hashPassword, verifyPassword, generateAccessToken, generateRefreshToken, verifyToken } from '../src/lib/auth';

describe('Auth Utilities', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'test123';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(0);
    });

    it('should generate different hashes for same password', async () => {
      const password = 'test123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyPassword', () => {
    it('should verify correct password', async () => {
      const password = 'test123';
      const hashed = await hashPassword(password);
      
      const isValid = await verifyPassword(password, hashed);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'test123';
      const hashed = await hashPassword(password);
      
      const isValid = await verifyPassword('wrong', hashed);
      expect(isValid).toBe(false);
    });
  });

  describe('JWT Functions', () => {
    const testPayload = {
      userId: 'test-user-id',
      email: 'test@example.com',
      role: 'CUSTOMER',
    };

    describe('generateAccessToken', () => {
      it('should generate an access token', () => {
        const token = generateAccessToken(testPayload);
        
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
      });
    });

    describe('generateRefreshToken', () => {
      it('should generate a refresh token', () => {
        const token = generateRefreshToken(testPayload);
        
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
      });
    });

    describe('verifyToken', () => {
      it('should verify a valid token', () => {
        const token = generateAccessToken(testPayload);
        const decoded = verifyToken(token);
        
        expect(decoded).toBeDefined();
        expect(decoded?.userId).toBe(testPayload.userId);
        expect(decoded?.email).toBe(testPayload.email);
        expect(decoded?.role).toBe(testPayload.role);
      });

      it('should return null for invalid token', () => {
        const decoded = verifyToken('invalid-token');
        expect(decoded).toBeNull();
      });
    });
  });
});
