<script lang="ts">
  import { Button, Input, Select, Textarea } from "flowbite-svelte";
  import { doFetch } from "./common";
  import { dbN } from "./stores";

  import { onMount } from "svelte";

  import { push, querystring } from "svelte-spa-router";

  // export let ride;
  // export let onDone;

  console.log($querystring);

  let routes = [];
  let bikes = [];

  let id;
  let ride_date;
  let ride_date_as_str;
  let route_id;
  let bike_id;
  let km;
  let alt_gain;
  let description;
  let weather;

  onMount(async () => {
    routes = await doFetch($dbN, "select id, name from routes order by name");
    bikes = await doFetch($dbN, "select id, name from bikes order by name");

    if ($querystring === "0") {
      id = "";
      ride_date = new Date();
      ride_date.setHours(ride_date.getHours() + 10);
      ride_date_as_str = ride_date.toISOString().split("T")[0];
      route_id = "22";
      bike_id = "10";
      km = 21;
      alt_gain = 167;
      description = "SoB";
      weather = "";
    } else {
      const rides = await doFetch(
        $dbN,
        `select * from rides where id=${$querystring}`
      );
      console.log("editing");
      // console.log(rides);
      const ride = rides[0];
      console.log(ride);
      id = ride.id;
      ride_date_as_str = ride.ride_date;
      route_id = ride.route_id;
      bike_id = ride.bike_id;
      km = ride.km;
      alt_gain = ride.alt_gain;
      description = ride.description;
      weather = ride.weather;
    }
  });

  let qresult = null;

  //fetch('https://www.artspace7.com.au/dsql/json_helper_get.php?db=art25285_rides2&sql=select%20*%20from%20bikes')

  async function doAddOrUpdate() {
    const sql =
      id === ""
        ? "INSERT INTO rides (route_id, ride_date, km, alt_gain, description, weather, bike_id) " +
          "values (" +
          route_id +
          ",'" +
          ride_date_as_str +
          "'," +
          km +
          "," +
          alt_gain +
          ",'" +
          description.replace(/'/g, "''") +
          "','" +
          weather +
          "'," +
          bike_id +
          ")"
        : "REPLACE INTO rides (id, route_id, ride_date, km, alt_gain, description, weather, bike_id) " +
          "values (" +
          id +
          "," +
          route_id +
          ",'" +
          ride_date_as_str +
          "'," +
          km +
          "," +
          alt_gain +
          ",'" +
          description.replace(/'/g, "''") +
          "','" +
          weather.replace(/'/g, "''") +
          "'," +
          bike_id +
          ")";
    qresult = await doFetch($dbN, sql);
    console.log(qresult);
    // onDone();

    push("/list");
  }
</script>

<main>
  <div class="w-full max-w-xs">
    <form>
      <div class="m-4">
        <label class="block text-gray-500 text-sm font-bold" for="id_date"
          >Date</label
        >
        <Input id="id_date" type="date" bind:value={ride_date_as_str} />

        <label class="block text-gray-500 text-sm font-bold" for="id_route"
          >Route</label
        >
        <Select id="id_route" bind:value={route_id}>
          {#each routes as route}
            <option value={route.id}>{route.name}</option>
          {/each}
        </Select>

        <label class="block text-gray-500 text-sm font-bold" for="id_bike"
          >Bike</label
        >
        <Select id="id_bike" bind:value={bike_id}>
          {#each bikes as bike}
            <option value={bike.id}>{bike.name}</option>
          {/each}
        </Select>

        <label class="block text-gray-500 text-sm font-bold" for="id_km"
          >Km</label
        >
        <Input id="id_km" type="number" bind:value={km} />

        <label class="block text-gray-500 text-sm font-bold" for="id_alt"
          >Alt gain</label
        >
        <Input id="id_alt" type="number" bind:value={alt_gain} />

        <label class="block text-gray-500 text-sm font-bold" for="id_desc"
          >Description</label
        >
        <Textarea id="id_desc" bind:value={description} />

        <label class="block text-gray-500 text-sm font-bold" for="id_weather"
          >Weather</label
        >
        <Textarea id="id_weather" bind:value={weather} />

        <Button class="mt-4" type="button" on:click={doAddOrUpdate}>
          {#if id === ""}Add Ride{:else}Update{/if}
        </Button>
      </div>
    </form>
  </div>
</main>
