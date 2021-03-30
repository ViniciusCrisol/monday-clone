import { useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<IconBaseProps>;
  name: string;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isField, setIsfField] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsfField(!!inputRef.current?.value);
  }, []);

  const handleInputFucus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      path: 'value',
      name: fieldName,
      ref: inputRef.current
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isField={isField}>
      {Icon && <Icon size={20} />}

      <input
        {...rest}
        ref={inputRef}
        autoComplete="off"
        onBlur={handleInputBlur}
        onFocus={handleInputFucus}
        defaultValue={defaultValue}
      />
    </Container>
  );
};

export default Input;
