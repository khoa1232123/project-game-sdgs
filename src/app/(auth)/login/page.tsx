"use client";
import { LoginType } from "@/contants/type";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLogin } from "@/hooks/useLogin";
import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const Login = (props: Props) => {
  const [dataLogin, setDataLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { handleLogin, isLoading, user } = useLogin();

  console.log({ user });

  useEffect(() => {
    if (user?.uid) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin(dataLogin);
  };

  return (
    <div className="flex-center h-full">
      <header>
        <title>Login</title>
      </header>
      <div className="max-w-[500px] px-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <TextField
            name="email"
            type="email"
            className="!mt-4 w-full"
            label="Email"
            size="small"
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            className="!mt-4 w-full"
            label="Password"
            size="small"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            className="!mt-4 w-full bg-blue-500"
          >
            Login
          </Button>
          <p className="!mt-2 text-center">
            {`Do not have an account? `}
            <Link
              href={"/signup"}
              className="text-blue-500 hover:text-blue-600"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
