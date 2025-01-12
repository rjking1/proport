<script lang="ts">
  import { dbName } from "./stores";
  import Router, { push } from "svelte-spa-router";
  import { routes } from "./routes";
  import { onMount } from "svelte";
  import { DarkMode, Heading } from "flowbite-svelte";
  import MainMenu from "./MainMenu.svelte";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("db")) {
    $dbName = urlParams.get("db");
  }

  let ride = undefined;

  function handleEdit(editRide) {
    ride = editRide;
    push("/add");

    // see https://github.com/ItalyPaleAle/svelte-spa-router/blob/HEAD/Advanced%20Usage.md#static-props

    //  const routes = {
    //     '/': wrap({
    //         component: Foo,
    //         // Static props
    //         props: {
    //             num: 42
    //         }
    //     })
    // }

  }

  function handleDone() {
    ride = undefined;
    push("/list");
  }
  
</script>

<main>
  <div class="flex flex-row mt-4">
    <DarkMode />
    <Heading tag="h3" class="bg-blue-100">Project Tracker</Heading>
  </div>
  <Router {routes} />
  <!-- <MainMenu /> -->
  <!-- <Navbar let:hidden let:toggle>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi href="#/" active={true}>Login</NavLi>
      <NavLi href="#/list">List</NavLi>
      <NavLi href="#/add">Add</NavLi>
      <NavLi href="#/query">Query</NavLi>
    </NavUl>
  </Navbar> -->
</main>

<!-- <div class="p-8 overflow-hidden bg-gray-50 dark:bg-gray-900"> -->
<!-- </div> -->
