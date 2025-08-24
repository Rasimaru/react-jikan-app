import { Eye, EyeOff, Upload } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export type FormOption = {
  value: string;
  label: string;
};

export type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  id?: string;
  placeholder?: string;
  withToggle?: boolean;
  options?: FormOption[];
  registration?: UseFormRegisterReturn;
  error?: FieldError | string;
  defaultValue?: string;
  onChangeUncontrolled?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

function FormField(props: FormFieldProps) {
  const {
    label,
    name,
    type,
    id,
    placeholder,
    withToggle,
    options,
    registration,
    error,
    defaultValue,
    onChangeUncontrolled
  } = props;
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      alert('Only PNG/JPEG allowed');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('File too large (max 2MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (onChangeUncontrolled) onChangeUncontrolled(e);
  };

  return (
    <div className="flex flex-col gap-2 relative pb-10">
      {['text', 'number', 'email', 'autocomplete'].includes(type) && (
        <label
          htmlFor={id ?? name}
          className="flex flex-col gap-2 text-base capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
        >
          {label}
          <input
            id={id ?? name}
            name={name}
            type={withToggle ? (show ? 'text' : 'password') : type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChangeUncontrolled}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:bg-neutral-100 ${error ? 'outline-2 outline-red-500' : ''}`}
            {...registration}
            list={type === 'autocomplete' ? `${name}-list` : undefined}
          />
          {type === 'autocomplete' && options && (
            <datalist id={`${name}-list`}>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </datalist>
          )}
        </label>
      )}

      {type === 'password' && (
        <label
          htmlFor={id ?? name}
          className="flex flex-col gap-2 text-base capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
        >
          {label}
          <div className="relative">
            <input
              id={id ?? name}
              name={name}
              type={show ? 'text' : 'password'}
              placeholder={placeholder}
              defaultValue={defaultValue}
              onChange={(e) => {
                onChangeUncontrolled?.(e);
              }}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pr-10
            focus:bg-neutral-100 ${error ? 'outline-2 outline-red-500' : ''}`}
              {...registration}
            />
            <button
              type="button"
              onClick={handleToggle}
              onBlur={() => setShow(false)}
              aria-label={`${label || name} visibility switch`}
              className="absolute top-0 right-0 flex justify-center items-center bg-neutral-900 hover:bg-amber-500 focus:bg-amber-300 focus:text-black hover:cursor-pointer duration-300 w-10 h-10 rounded-r-md text-white hover:text-black"
            >
              {show ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </label>
      )}

      {type === 'radio' && options && (
        <label
          htmlFor={id ?? name}
          className="flex flex-col gap-2 text-base capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
        >
          {label}
          <div className="flex gap-4">
            {options.map((opt) => (
              <label
                htmlFor={`${name}-${opt.value}`}
                key={opt.value}
                className="flex items-center gap-2 hover:cursor-pointer"
              >
                <input
                  type="radio"
                  id={`${name}-${opt.value}`}
                  name={name}
                  value={opt.value}
                  onChange={onChangeUncontrolled}
                  className="w-4 h-4"
                  {...registration}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </label>
      )}

      {type === 'checkbox' && (
        <label
          htmlFor={id ?? name}
          className="flex gap-5 text-base capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
        >
          {label}
          <input
            type="checkbox"
            id={id ?? name}
            name={name}
            onChange={onChangeUncontrolled}
            className="w-4 h-4 "
            {...registration}
          />
        </label>
      )}

      {type === 'file' && (
        <>
          <label
            htmlFor={id ?? name}
            className="flex flex-col gap-2 text-base capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
          >
            {label}
            <div className="flex gap-2">
              <Upload />
              <input
                type="file"
                id={id ?? name}
                name={name}
                accept="image/png,image/jpeg"
                className="hover:cursor-pointer hover:bg-amber-300"
                onChange={(e) => {
                  handleFileChange(e);
                  onChangeUncontrolled?.(e);
                }}
                {...registration}
              />
            </div>
          </label>
          {preview && (
            <img
              src={preview}
              alt="File preview"
              style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }}
            />
          )}
        </>
      )}

      {type === 'select' && options && (
        <select
          id={id ?? name}
          name={name}
          defaultValue={defaultValue}
          onChange={onChangeUncontrolled}
          className="h-10 rounded-md border border-input bg-neutral-100 px-3 py-2 text-sm shadow-sm"
          {...registration}
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {error && (
        <span className="text-red-500 text-sm absolute align-top bottom-0 min-h-10">
          {typeof error !== 'string' ? error.message : error}
        </span>
      )}
    </div>
  );
}
export default FormField;
