import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    flexGrow: 1,
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    flexGrow: 1,
    textAlign: "center",
  },
  image: {
    marginLeft: "15px",
  },
  button: {
    marginRight: theme.spacing(2),
    
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
