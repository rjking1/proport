import LoginPage from "./LoginPage.svelte";
import ListProjectsPage from "./ListProjectsPage.svelte";
import ListItemsPage from "./ListItemsPage.svelte";
import NotFound from "./NotFound.svelte";
import AddTextPage from "./AddTextPage.svelte";
import AddImagePage from "./AddImagePage.svelte";
import QueryPage from "./QueryPage.svelte";
import { wrap } from "svelte-spa-router/wrap";

export const routes = {
  // "/": Home,
  "/": LoginPage,
  // Exact path + parameter
  // "/article/:title": Article,
  // "/login": LoginPage,
  "/list/:uid": ListProjectsPage,
  "/addtext/:uid/:pid": AddTextPage,
  "/addimage/:uid/:pid": AddImagePage,
  "/project/:uid/:pid": ListItemsPage,
  "/query": QueryPage,
  // Wildcard
  "*": NotFound,
};
