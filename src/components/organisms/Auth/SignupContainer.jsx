import { useSignup } from "@/hooks/apis/auth/useSignup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupCard } from "./SignupCard";

export const SignupContainer = () => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [validationError, setValidationError] = useState(null);

  const {isPending, isSuccess, error, signupMutation} = useSignup();

  async function onSignupFormSubmit(e) {
    e.preventDefault();

    if(!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username) {
        console.error('All fields are required');
        setValidationError({ message: 'All fields are required'});
        return
    }

    if(signupForm.password !== signupForm.confirmPassword) {
        console.error('password not match');
        setValidationError({message: 'Password not match'});
        return
    }

    setValidationError(null);

    await signupMutation({
        email: signupForm.email,
        password: signupForm.password,
        confirmPassword: signupForm.confirmPassword,
        username: signupForm.username
    })
  };

  useEffect(() => {
    if(isSuccess) {
        setTimeout(() => {
            navigate('/auth/signin')
        }, 3000);
    }
  }, [isSuccess, navigate])

  return (
    <SignupCard
        error={error}
        isPending={isPending}
        isSuccess={isSuccess}
        signupForm={signupForm}
        setSignupForm={setSignupForm}
        validationError={validationError}
        onSignupFormSubmit={onSignupFormSubmit}
    />
  )
};
