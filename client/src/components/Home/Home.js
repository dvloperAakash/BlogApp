import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import { getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import { useDispatch } from "react-redux"; // use to dispatch an action.

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ currentId, setCurrentId }) => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));
  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch -> fetch search posts
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const classes = useStyles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Blogs"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Paper elevation={6} className={classes.paper}>
              <Typography variant="h5" className={classes.paperItem}>
                Have something to share?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/post/add"
                className={classes.addButton}
              >
                Write Blog
              </Button>
            </Paper>

            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
