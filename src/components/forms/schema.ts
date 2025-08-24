import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)*$/, 'First letter must be uppercase'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(0, 'Age cannot be negative'),
  email: yup.string().required('Email required').email('Invalid email'),
  password: yup
    .string()
    .required('Password required')
    .test('strength', function (value) {
      if (!value) return false;

      const errors: string[] = [];
      let score = 0;

      if (!/[0-9]/.test(value)) errors.push('Must contain a number');
      else score++;

      if (!/[A-Z]/.test(value)) errors.push('Must contain an uppercase letter');
      else score++;

      if (!/[a-z]/.test(value)) errors.push('Must contain a lowercase letter');
      else score++;

      if (!/[^A-Za-z0-9]/.test(value)) errors.push('Must contain a special character');
      else score++;

      if (value.length >= 8) score++;
      else errors.push('Must be at least 8 characters long');

      if (errors.length > 0) {
        return this.createError({ message: errors.join(', ') });
      }

      if (score < 3) {
        return this.createError({ message: 'Password strength: medium' });
      }

      return true; // strong password
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password'),
  gender: yup.string().required('Select gender'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept T&C').required(),
  picture: yup
    .mixed<File | FileList>()
    .required('Picture is required')
    .test('fileSize', 'File too large (max 2MB)', (file) => {
      if (file instanceof File) return file.size <= 2 * 1024 * 1024;
      if (file instanceof FileList) return file[0]?.size <= 2 * 1024 * 1024;
      return false;
    })
    .test('fileType', 'Unsupported file type', (file) => {
      const type = file instanceof File ? file.type : file instanceof FileList ? file[0]?.type : '';
      return ['image/png', 'image/jpeg'].includes(type ?? '');
    }),
  country: yup.string().required('Select country')
});

export default schema;
