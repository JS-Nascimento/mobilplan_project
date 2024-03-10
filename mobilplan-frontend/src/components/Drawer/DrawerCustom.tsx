// DrawerCustom.js
import {
  Drawer,
  List,
  Divider,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Theme } from "@mui/material/styles";
import MobilplanIcon from "../Logo";
import { ListItemCustom, listItems } from "./ListItemCustom";


interface DrawerCustomProps {
  open: boolean;
  handleDrawerClose: () => void;
  theme: Theme;
}


export default function DrawerCustom({
  open,
  handleDrawerClose,
  theme,
}: DrawerCustomProps) {

  const sections = Array.from(new Set(listItems.map(item => item.section)));

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 360,
          boxSizing: "border-box",
          backgroundColor: theme.palette.primary.main,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box display="flex" justifyContent="space-between">
        <IconButton>
          <MobilplanIcon width={90} height={48} />
        </IconButton>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>
      <Divider />
      {sections.map((section) => (
        <List key={section}>
          <Typography variant="body1" component="h2" fontWeight={600} sx={{ mt: 2, ml: 2 }}>
            {section}
          </Typography>
          {listItems.filter(item => item.section === section).map((item) => (
            <ListItemCustom key={item.title} {...item} />
          ))}
        </List>
      ))}
    </Drawer>
  );
}
