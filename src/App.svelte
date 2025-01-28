<script lang="ts">
  import { dbName } from "./stores";
  import Router, { push } from "svelte-spa-router";
  import { routes } from "./routes";
  import { onMount } from "svelte";
  import { DarkMode, Heading, Button } from "flowbite-svelte";
  import { dbN, permissions, selections } from "./stores";
  import MainMenu from "./MainMenu.svelte";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("db")) {
    $dbName = urlParams.get("db");
  }

  if (urlParams.has("share")) {
    let link = urlParams.get("share");
    // let uid = 
    // $selections = {...}
    // push(`/list/{uid}`) // this is top level
    // how are other interests and potfolios/etc not shown?
  }
  
</script>

<main>
  <div class="flex flex-row mt-4">
    <DarkMode />
    <div class="x">
      <Heading tag="h3" class="bg-blue-100">Project Tracker</Heading>
      {#if $permissions}
      <Button color="light" on:click={()=>push('/')}>{$permissions.u_name}<br>signed in</Button>
      {/if}
      {#if !$permissions}
      <Button color="light" on:click={()=>push('/')}>Sign in</Button>
      {/if}
    </div>
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

<style>
  .x {
  width: 100%;
  display: flex;
  justify-content: space-between;
  }
</style>

