import { Button, styled, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";

export {
  TextField,
  Select,
  Autocomplete,
  MenuItem,
  Typography,
  List,
  ListItemText,
  PersonIcon,
  WorkIcon,
};

//component
export const CustomListItem = ({ icon, primary, secondary, onClick }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "15px",
    }}
    onClick={onClick}
  >
    {icon && <div style={{ marginRight: "8px" }}>{icon}</div>}

    <div>
      <Typography variant="body1" component="div">
        {primary}
      </Typography>
      <Typography variant="body2" component="div">
        {secondary}
      </Typography>
    </div>
  </div>
);
// export const SelectMenu = styled(Select)(() => {
//   autoWidth: true
// });

export const ColumnContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const RowContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
});

//////////////////////////////

// const btnFn = styled(Button);

export const Btn = styled(Button)(({ variant, size }) => {
  if (variant === "text") {
    return { marginRight: "500px", width: size, alignSelf: "flex-start" };
  }
  return {
    marginRight: "30px",
    width: 'auto',
    alignSelf: "flex-start",
    whiteSpace: "nowrap",
  };
});
