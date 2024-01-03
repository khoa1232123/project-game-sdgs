"use client";
import React from "react";
import Wrapper from "./Wrapper";
import {
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useLogout } from "@/hooks";
import { Logout } from "@mui/icons-material";

type Props = {};

const Header = (props: Props) => {
  const { handleLogout } = useLogout();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    setOpen(false);
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="header">
      <Wrapper>
        <div className="row flex items-center justify-between">
          <div className="header__logo">Logo</div>
          <div className="header__right">
            <Button
              variant="contained"
              className="bg-red-500"
              color="error"
              onClick={handleLogout}
            >
              <Logout />
              Logout
            </Button>
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="top-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "right top" : "right bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
