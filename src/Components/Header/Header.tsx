import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box, Button, IconButton, Link } from "@mui/material";
import ResponsiveDrawer from "../Drawer/Drawer";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ElevationScroll = ({ children }: { children: any }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const Header: React.FC = () => {
  return (
    <ElevationScroll>
      <AppBar position="sticky"  style={{backgroundColor:"black"}}>
        <Toolbar variant="dense">
          <div className="w-16">
            <ResponsiveDrawer />
          </div>

          <img
            src="books.svg"
            alt=""
            className="w-10 h-12 m-2 mr-4"
            style={{}}
          />
         
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: (theme: { palette: { common: { white: any; }; }; }) => theme.palette.common.white }}
          >
            Library Management System
          </Typography>
          {/* <Link
            href={"/attendance-reports"}
            sx={{ textDecoration: "none", color: "black" }}
          >
            <IconButton color="default">
              <InfoOutlinedIcon style={{ color: "white" }} />
            </IconButton>
          </Link> */}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};
export default Header;
