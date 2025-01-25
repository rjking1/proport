import LoginPage from "./LoginPage.svelte";
import ListProjectsPage from "./ListProjectsPage.svelte";
import ListItemsPage from "./ListItemsPage.svelte";
import NotFound from "./NotFound.svelte";
import AddTextPage from "./AddTextPage.svelte";
import AddImagePage from "./AddImagePage.svelte";
import QueryPage from "./QueryPage.svelte";

export const routes = {
  "/": LoginPage,
  "/list/:uid/:share?": ListProjectsPage,
  "/shared/:uid/:share": ListProjectsPage,
  "/addtext/:uid/:pid": AddTextPage,
  "/addimage/:uid/:pid": AddImagePage,
  "/project/:uid/:pid": ListItemsPage,
  "/query": QueryPage,
  "*": NotFound,
};
