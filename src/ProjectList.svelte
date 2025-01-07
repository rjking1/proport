<script>
  import ProjectHeader from "./ProjectHeader.svelte";
  import Project from "./Project.svelte";
  import { Table } from "flowbite-svelte";

  export let projects;
  export let onEdit;

  function handleEdit(project) {
    onEdit(project);
  }
</script>

<Table striped={true}>
  <ProjectHeader />
  {#each projects as project}
    <Project bind:project onEdit={() => handleEdit(project)} />
  {/each}
</Table>
