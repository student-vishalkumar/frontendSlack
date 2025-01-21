import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export const SignupCard = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Please SignUp to Create Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-3">
          <Input
            placeholder="Email"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            value={signupForm.email}
            type="email"
            disabeled={false}
          />

          <Input
            placeholder="Password"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            value={signupForm.password}
            type="password"
            disabeled={false}
          />

          <Input
            placeholder="Confirm Password"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, confirmPassword: e.target.value })
            }
            value={signupForm.confirmPassword}
            type="password"
            disabeled={false}
          />

          <Input
            placeholder="username"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
            value={signupForm.username}
            type="text"
            disabeled={false}
          />

          <Button
          disabeled={false}
          size = "lg"
          type = "submit"
          className = "w-full"
          >
            Continue
          </Button>

          <Separator className="my-5" />

          <p
          className="text-s text-mutated-foreground mt-4"
          >
            Already have an account?{' '}
            <span className="text-sky-600 hover:underline cursor-pointer">
                SignIn
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
