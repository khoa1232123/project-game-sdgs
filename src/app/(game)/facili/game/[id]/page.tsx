"use client";
import Facilitator from "@/components/FaciliGame/Facilitator";
import { useCurrentUser } from "@/hooks";
import { Avatar } from "@mui/material";
import React from "react";

type Props = {};

const FaciliGamePage = (props: Props) => {
  const { user } = useCurrentUser();

  return (
    <div className="h-[100vh]">
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="w-1/3">
            <Facilitator user={user} />
            </div>
            <div className="w-1/3">
              <div className="card">helo</div>
            </div>
            <div className="w-1/3">
              <div className="card">helo</div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-2/3">
              <div className="card">hello</div>
            </div>
            <div className="w-1/6">
              <div className="card">hello</div>
            </div>

            <div className="w-1/6">
              <div className="card">hello</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaciliGamePage;
