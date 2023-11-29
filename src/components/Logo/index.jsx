import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EngineeringIcon from "@mui/icons-material/Engineering";

//ref
const Logo = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <EngineeringIcon fontSize="large" />
      <Typography variant="h4" fontWeight="bold">
        Master
      </Typography>
      <Typography variant="h4" fontWeight="bold" color="primary.main">
        EPI
      </Typography>
    </Box>
  );
};

export default Logo;
