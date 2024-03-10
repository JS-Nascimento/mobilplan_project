import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import ForestIcon from '@mui/icons-material/Forest';
import TextureIcon from '@mui/icons-material/Texture';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from "react-router-dom";

type ListItemProps = {
  section: string;
  icon: JSX.Element;
  title: string;
  href?: string | undefined;
};

const materiaPrimasection = "Matéria Prima";
const crmSection = "Crm";

export const listItems: ListItemProps[] = [
  // ... your list items for the first section
  {
    section: materiaPrimasection,
    icon: <SettingsIcon />,
    title: "Ferragens",
    href: "/ferragem",
  },
  // ... more list items for the first section,
  {
    section: materiaPrimasection,
    icon: <EarbudsIcon />,
    title: "Acessórios",
    href: "/acessorio",
  },
  {
    section: materiaPrimasection,
    icon: <ForestIcon />,
    title: "Chapas",
    href: "/chapas",
  },
  {
    section: materiaPrimasection,
    icon: <TextureIcon />,
    title: "Fitas de Bordo",
    href: "/fitas",
  },
  {
    section: crmSection,
    icon: <GroupIcon />,
    title: "Clientes",
    href: "/cliente",
  },
  // ... list items for the second section (if any)
  // ...
];

export const ListItemCustom = ({section, icon, title, href }: ListItemProps) => (
  <ListItem key={section}>
    <ListItemButton component={Link} to={href as string}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  </ListItem>
);
