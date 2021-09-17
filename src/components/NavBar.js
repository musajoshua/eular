import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };
  const [eth, setEth] = useState("");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Euler
          </Typography>
          {/* Todo: Connect to metamask */}
          {isMetaMaskInstalled() ? (
            eth ? (
              <>(Address: {eth})</>
            ) : (
              <Button
                onClick={async () => {
                  try {
                    // Will open the MetaMask UI
                    // You should disable this button while the request is pending!
                    const res = await window.ethereum.request({
                      method: "eth_requestAccounts",
                    });
                    setEth(res[0]);
                  } catch (error) {
                    console.error(error);
                  }
                }}
                color="inherit"
              >
                Connect
              </Button>
            )
          ) : (
            <Button
              onClick={() => {
                window.location.assign("https://metamask.io/");
              }}
              color="inherit"
            >
              Install Metamask
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
