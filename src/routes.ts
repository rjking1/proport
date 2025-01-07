import LoginPage from "./LoginPage.svelte";
import ListProjectsPage from "./ListProjectsPage.svelte";
import ListItemsPage from "./ListItemsPage.svelte";
import NotFound from "./NotFound.svelte";
import AddPage from "./AddPage.svelte";
import QueryPage from "./QueryPage.svelte";
import { wrap } from "svelte-spa-router/wrap";

export const routes = {
  // "/": Home,
  "/": LoginPage,
  // Exact path + parameter
  // "/article/:title": Article,
  // "/login": LoginPage,
  "/list": ListProjectsPage,
  "/add": AddPage,
  "/project": ListItemsPage,
  "/query": QueryPage,
  // Wildcard
  "*": NotFound,
};
