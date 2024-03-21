import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MobilplanIcon from "../components/Logo";
import DrawerCustom from "./Drawer/DrawerCustom";
import {appTheme} from "../config/theme";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {fetchUserDetails, logoutAsync, selectUserDetails} from "../features/auth/authSlice";
import {useAppDispatch} from "../app/hooks";
import {useEffect} from "react";


const settings = ["Perfil", "Marcenaria", "Configurações", "Logout"];

export function Header() {
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    dispatch(logoutAsync())
        .unwrap()
        .then(() => {
          navigate('/login');
        })
        .catch((error) => {

          console.error('Error during logout:', error);
        });
  };

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton component={Link} to={"/"}>
            <MobilplanIcon width={90} height={48} />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={userDetails?.email}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userDetails?.name} src={userDetails?.image} />
                <Box sx={{ ml: 1 }}></Box>
                <Typography>{userDetails?.name}</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}
                          onClick={() => {
                            if(setting === "Logout"){
                            handleLogout();
                            handleCloseUserMenu();
                          } else if (setting === "Configurações"){
                            navigate('/settings');
                            handleCloseUserMenu();
                          }}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <DrawerCustom open={open} handleDrawerClose={handleDrawerClose} theme={appTheme} />
    </>
  );
}
