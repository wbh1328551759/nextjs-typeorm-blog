import React, { useCallback, useState } from 'react';

type Field<T> = {
  label: string;
  type: 'text' | 'password' | 'textarea';
  key: keyof T;
}

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: React.ReactChild;
  onSubmit: (fd: T) => void;
}

export function useForm<T>({initFormData, fields, buttons, onSubmit}: useFormOptions<T>) {
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    return e;
  });

  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({...formData, [key]: value});
  }, [formData]);

  const _onSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(formData);
  }, [onSubmit, formData]);

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(field =>
        <div key={field.label}>
          <label>{field.label}
            {field.type === 'textarea' ?
              <textarea
                onChange={(e) => onChange(field.key, e.target.value)}
                value={formData[field.key].toString()}/>
              : <input
                type={field.type}
                value={formData[field.key].toString()}
                onChange={(e) => onChange(field.key, e.target.value)}/>
            }
          </label>
          {errors[field.key]?.length > 0 && <div>
            {errors[field.key].join(',')}
          </div>}
        </div>
      )}
      <div>{buttons}</div>
    </form>
  );
  return {
    form,
    setErrors
  };
}
