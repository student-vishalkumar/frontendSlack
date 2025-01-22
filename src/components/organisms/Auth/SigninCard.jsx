import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SigninCard = () => {
    const navigate = useNavigate();
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>SignIn</CardTitle>
        <CardDescription>Sign in access to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-3">
          <Input
            disabled={false}
            placeholder="Email"
            required
            type="email"
            value={signinForm.email}
            onChange={() =>
              setSigninForm({ ...signinForm, email: e.target.value })
            }
          />

          <Input
            disabled={false}
            placeholder="Password"
            required
            type="password"
            value={signinForm.password}
            onChange={() =>
              setSigninForm({ ...signinForm, password: e.target.value })
            }
          />
          <Button className="w-full" disabled={false} size="lg" type="submit">
            Signin
          </Button>
        </form>

        <Separator className="my-5" />
        <p
        className="text-s text-muted-foreground mt-4"
        >
            Don't have an account?{' '}
            <span className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate('/auth/signup')}
            >
                SignUp
            </span>
        </p>
      </CardContent>
    </Card>
  );
};
