import { useRef, useState } from 'react';
import FormField, { type FormOption } from './FormField';
import { useDispatch, useSelector } from 'react-redux';
import { setPicture, selectCountries } from '@/store/formSlice';
import * as Yup from 'yup';
import schema from './Schema';

const genderOptions: FormOption[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Not sure' }
];

type UncontrolledFormProps = {
  onSubmit?: (data: { name: string; email: string; picture?: string; country: string }) => void;
};

type Errors = Record<string, string>;

export default function UncontrolledForm({ onSubmit }: UncontrolledFormProps) {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const rawData = Object.fromEntries(formData.entries()) as Record<
      string,
      string | File | boolean
    >;
    rawData.acceptTerms = formData.get('acceptTerms') ? true : false;
    const fileInput = formRef.current.elements.namedItem('picture') as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      rawData.picture = fileInput.files[0];
    } else {
      delete rawData.picture;
    }

    try {
      await schema.validate(rawData, { abortEarly: false });
      setErrors({});

      const { name, email, country } = rawData;

      if (rawData.picture instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          dispatch(setPicture(base64));
          onSubmit?.({
            name: name as string,
            email: email as string,
            picture: base64,
            country: country as string
          });
        };
        reader.readAsDataURL(rawData.picture);
      } else {
        onSubmit?.({ name: name as string, email: email as string, country: country as string });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const e: Record<string, string> = {};
        err.inner.forEach((i) => i.path && (e[i.path] = i.message));
        setErrors(e);
      }
    }
  };

  return (
    <div className="flex items-center text-black justify-center w-full">
      <div className="w-full rounded-2xl border bg-neutral-100/90 shadow-lg">
        <div className="border-b px-6 py-4">
          <h2 className="text-center text-xl font-semibold">Uncontrolled Form</h2>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="px-6 py-6 text-left">
          <FormField label="Name" name="name" type="text" error={errors.name} />
          <FormField label="Age" name="age" type="number" error={errors.age} />
          <FormField label="Email" name="email" type="email" error={errors.email} />
          <FormField label="Password" name="password" type="password" error={errors.password} />
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            error={errors.confirmPassword}
          />
          <FormField
            label="Gender"
            name="gender"
            type="radio"
            options={genderOptions}
            error={errors.gender}
          />
          <FormField
            label="Accept Terms"
            name="acceptTerms"
            type="checkbox"
            error={errors.acceptTerms}
          />
          <FormField label="Upload Picture" name="picture" type="file" error={errors.picture} />
          <FormField
            label="Country"
            name="country"
            type="autocomplete"
            options={countries}
            error={errors.country}
          />
          <button
            type="submit"
            className="inline-flex items-center bg-amber-500 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-amber-300 hover:cursor-pointer rounded font-semibold duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
