import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch, useSelector } from 'react-redux';
import FormField, { type FormOption } from './FormField';
import { setPicture, selectCountries } from '@/store/formSlice';
import schema from './Schema';

type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: File | FileList;
  country: string;
};

type HookFormProps = {
  onSubmit?: (data: { name: string; email: string; picture?: string; country: string }) => void;
};

const genderOptions: FormOption[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Not sure' }
];

export default function HookForm({ onSubmit }: HookFormProps) {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const submitForm: SubmitHandler<FormValues> = (data) => {
    const { name, email, country } = data;
    let file: File | undefined;

    if (data.picture instanceof FileList) {
      file = data.picture[0];
    } else if (data.picture instanceof File) {
      file = data.picture;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        dispatch(setPicture(base64));
        onSubmit?.({ name, email, picture: base64, country });
      };
      reader.readAsDataURL(file);
    } else {
      onSubmit?.({ name, email, country });
    }
  };

  return (
    <div className="flex items-center text-black justify-center w-full">
      <div className="w-full rounded-2xl border bg-neutral-100/90 shadow-lg">
        <div className="border-b px-6 py-4">
          <h2 className="text-center text-xl font-semibold">Controlled Form</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)} className="px-6 py-6 text-left">
          <FormField
            label="Name"
            name="name"
            type="text"
            registration={register('name')}
            error={errors.name}
          />
          <FormField
            label="Age"
            name="age"
            type="number"
            registration={register('age')}
            error={errors.age}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            registration={register('email')}
            error={errors.email}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            withToggle
            registration={register('password')}
            error={errors.password}
          />
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            withToggle
            registration={register('confirmPassword')}
            error={errors.confirmPassword}
          />
          <FormField
            label="Gender"
            name="gender"
            type="radio"
            options={genderOptions}
            registration={register('gender')}
            error={errors.gender}
          />
          <FormField
            label="Accept Terms & Conditions"
            name="acceptTerms"
            type="checkbox"
            registration={register('acceptTerms')}
            error={errors.acceptTerms}
          />
          <FormField
            label="Upload Picture"
            name="picture"
            type="file"
            registration={register('picture')}
            error={errors.picture}
          />
          <FormField
            label="Country"
            name="country"
            type="autocomplete"
            options={countries}
            registration={register('country')}
            error={errors.country}
          />
          <button
            type="submit"
            disabled={!isValid}
            className={`inline-flex items-center  text-black border-0 py-1.5 px-5 focus:outline-none   rounded font-semibold duration-300 ${isValid ? 'bg-amber-500 hover:bg-amber-300 hover:cursor-pointer' : 'bg-neutral-400'}`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
