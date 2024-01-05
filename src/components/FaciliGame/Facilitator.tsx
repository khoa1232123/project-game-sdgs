import { Avatar, Button } from "@mui/material";
import { User } from "firebase/auth";

type Props = {
  user?: User | null;
};

const Facilitator = ({ user }: Props) => {
  return (
    <div className="card fgp-facilitator">
      <h2 className="fgp-facilitator__title">Admin game</h2>
      <div className="fgp-facilitator__top">
        <div className="fgp-facilitator__top__avatar">
          <div className="mb-2">
            <Avatar />
            <h3>{user?.displayName}</h3>
          </div>
          <Button variant="contained" size="small" className="bg-blue-500">
            Settings
          </Button>
        </div>
        <div className="fgp-facilitator__top__comment">
          <textarea placeholder="message from facilitor" />
        </div>
      </div>
    </div>
  );
};

export default Facilitator;
