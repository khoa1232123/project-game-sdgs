"use client";
import React from "react";
import Wrapper from "./Wrapper";
import { Button } from "@mui/material";
import { useLogout } from "@/hooks";

type Props = {};

const Header = (props: Props) => {
  const { handleLogout } = useLogout();
  return (
    <div className="header">
      <Wrapper>
        <div className="row flex items-center justify-between">
          <div className="header__logo">Logo</div>
          <div className="header__right">
            <Button
              variant="contained"
              className="bg-blue-500"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
