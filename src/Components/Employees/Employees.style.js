import { Button, styled } from "@mui/material";

export const Container = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const Button = styled(Button)(({ variant }) => {
  if (variant === "text") {
    return { marginRight: "30px", width: size };
  }
  return {
    marginRight: "30px",
    width: size,
  };
});
