import React from 'react';

const ForgotPassword = () => {
  const [ formState, setFormState] = useState(INITIAL_FORM_STATE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleForgotPassword();
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
    console.log(formState);
  };

  return (
    <section>
      ForgotPassword
    </section>
  )
}

export default ForgotPassword;
