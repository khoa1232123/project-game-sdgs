"use client";
import { LoginType, RegisterType } from "@/contants/type";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRegister } from "@/hooks/useRegister";
import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const Signup = (props: Props) => {
  const router = useRouter();
  const [dataRegister, setDataRegister] = useState<RegisterType>({
    email: "",
    password: "",
    displayName: "",
  });
  const { handleRegister, isLoading } = useRegister();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setDataRegister({ ...dataRegister, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(dataRegister);
  };

  return (
    <div className="flex-center h-full">
      <header>
        <title>Signup</title>
      </header>
      <div className="max-w-[500px] px-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold">Signup</h2>
          <TextField
            name="displayName"
            type="text"
            className="!mt-4 w-full"
            label="Name"
            size="small"
            onChange={handleChange}
          />
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
            Signup
          </Button>
          <p className="!mt-2 text-center">
            {`Do you already have an account? `}
            <Link href={"/login"} className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
