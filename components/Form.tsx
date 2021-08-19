import React, { ChangeEventHandler, FormEventHandler } from 'react';

type Field = {
  label: string,
  type: 'text' | 'password',
  value: string | number,
  onChange: ChangeEventHandler<HTMLInputElement>,
  errors: string[]
}

type Props = {
  fields: Field[],
  onSubmit: FormEventHandler,
  buttons: React.ReactChild,
}

const Form: React.FC<Props> = ({fields, onSubmit, buttons}: Props) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map(field =>
        <div key={field.label}>
          <label>{field.label}
            <input type={field.type} value={field.value} onChange={field.onChange}/>
          </label>
          {field.errors?.length > 0 && <div>
            {field.errors.join(',')}
          </div>}
        </div>
      )}
      <div>{buttons}</div>
    </form>
  );
};

export default Form;
