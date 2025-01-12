<script>
  import { TableBodyRow, TableBodyCell } from "flowbite-svelte";

  export let project;
  export let onEdit;

  function handleEdit() {
    onEdit(project);
  }
</script>

<TableBodyRow>
  <TableBodyCell>
    <button on:click={handleEdit}>📂 Open</button>
  </TableBodyCell>  
  <TableBodyCell>{project.Project}</TableBodyCell>
  <TableBodyCell>{project.Portfolio}</TableBodyCell>
  <TableBodyCell>{project.Interest}</TableBodyCell>
  <TableBodyCell>{project.Progress}</TableBodyCell>
</TableBodyRow>
