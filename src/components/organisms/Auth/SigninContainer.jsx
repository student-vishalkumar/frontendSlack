import { useSignin } from "@/hooks/apis/auth/useSignin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigninCard } from "./SigninCard";

export const SigninContainer = () => {
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState(null);

  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const { isPending, isSuccess, error, signinMutation } = useSignin();

  const onSigninFormSubmit = async (e) => {
    e.preventDefault();

    if (!signinForm.email || !signinForm.password) {
      setValidationError({
        message: "Please fill all the fields",
      });
      return;
    }

    setValidationError(null);

    console.log(signinForm.email, signinForm.password);
    await signinMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  }, [isSuccess, navigate]);
  
  return (
    <SigninCard
      onSigninFormSubmit={onSigninFormSubmit}
      signinForm={signinForm}
      setSigninForm={setSigninForm}
      validationError={validationError}
      error={error}
      isSuccess={isSuccess}
      isPending={isPending}
    />
  );
};
