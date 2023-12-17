import Wrapper from "@/components/Wrapper";
import { Button } from "@mui/material";
import React from "react";

type Props = {};

const FaciliGameList = (props: Props) => {
  const showModalForNewGame = (event: any) => {};
  return (
    <Wrapper>
      <div className="container">
        <Button onClick={showModalForNewGame}>Create a new world</Button>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name of world</th>
              <th>URL for players</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default FaciliGameList;
