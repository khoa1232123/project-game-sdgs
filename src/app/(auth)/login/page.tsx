"use client";
import { LoginType } from "@/contants/type";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const Login = (props: Props) => {
  const [dataLogin, setDataLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-full flex-center">
      <div className="max-w-[500px] px-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <TextField
            name="email"
            type="email"
            className="w-full mt-4"
            label="Email"
            size="small"
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            className="w-full mt-4"
            label="Password"
            size="small"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            className="bg-blue-500 w-full mt-4"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
