import schema from '@/components/forms/schema';

describe('Form validation schema', () => {
  const validFile = new File(['dummy'], 'photo.png', {
    type: 'image/png',
    lastModified: Date.now()
  });

  const validData = {
    name: 'John',
    age: 25,
    email: 'john@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!',
    gender: 'male',
    acceptTerms: true,
    picture: validFile,
    country: 'USA'
  };

  test('valid data passes validation', async () => {
    await expect(schema.validate(validData)).resolves.toEqual(validData);
  });

  test('name must be required and start with uppercase', async () => {
    await expect(schema.validate({ ...validData, name: '' })).rejects.toThrow('Name is required');
    await expect(schema.validate({ ...validData, name: 'john' })).rejects.toThrow(
      'First letter must be uppercase'
    );
  });

  test('age must be number and non-negative', async () => {
    await expect(schema.validate({ ...validData, age: -1 })).rejects.toThrow(
      'Age cannot be negative'
    );
    await expect(schema.validate({ ...validData, age: 'abc' })).rejects.toThrow(
      'Age must be a number'
    );
  });

  test('email must be valid', async () => {
    await expect(schema.validate({ ...validData, email: 'invalid' })).rejects.toThrow(
      'Invalid email'
    );
  });

  test('password rules', async () => {
    await expect(schema.validate({ ...validData, password: 'abc' })).rejects.toThrow();
    await expect(schema.validate({ ...validData, confirmPassword: 'Mismatch1!' })).rejects.toThrow(
      'Passwords must match'
    );
  });

  test('acceptTerms must be true', async () => {
    await expect(schema.validate({ ...validData, acceptTerms: false })).rejects.toThrow(
      'You must accept T&C'
    );
  });

  test('picture must be valid file type and size', async () => {
    const largeFile = new File(['a'.repeat(3 * 1024 * 1024)], 'big.png', { type: 'image/png' });
    const invalidType = new File(['dummy'], 'file.txt', { type: 'text/plain' });

    await expect(schema.validate({ ...validData, picture: largeFile })).rejects.toThrow(
      'File too large'
    );
    await expect(schema.validate({ ...validData, picture: invalidType })).rejects.toThrow(
      'Unsupported file type'
    );
  });

  test('country is required', async () => {
    await expect(schema.validate({ ...validData, country: '' })).rejects.toThrow('Select country');
  });
});
