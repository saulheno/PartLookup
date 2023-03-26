<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  // import Counter from './lib/Counter.svelte'
  import { getPartsById } from "./mongo.js";
  import { getImageUrl } from "./storage.js";
  import { each, loop_guard } from "svelte/internal";

  let id = "";
  let parts = null;
  let imageUrl = "";

  async function handleSubmit(event) {
    event.preventDefault();
    parts = await getPartsById(id);
    imageUrl = await getImageUrl(id);
  }
</script>

<main>
  <div id="surround">
    <div id="Header">
      <h1>Part Lookup</h1>
      
    </div>
    <div id="id">
      <h2>{id}</h2>
    </div>
    <div id="search">
      <form on:submit={handleSubmit}>
        <label>
          ID:
          <input type="text" bind:value={id} />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  </div>

  {#if parts}
    <div class="container">
      <div class="image-container">
        <img src={imageUrl} alt={id} />
      </div>
      <div class="table-container">
        <table id="main">
          <thead>
            <tr>
              <th>ID</th>
              <th>Part Number</th>
              <th>Part Name</th>
              <th>Qty</th>
              <th>Ex Info</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.keys(parts) as id}
              <tr>
                <td>{id}</td>
                <td>
                  <table>
                    {#each ["partno", "partno2", "partno3", "partno4", "partno5"] as partnoProp}
                      {#if parts[id].hasOwnProperty(partnoProp)}
                        <tr>
                          <td>{parts[id][partnoProp] || "-"}</td>
                        </tr>
                      {/if}
                    {/each}
                  </table>
                </td>
                <td>{parts[id].partname || "-"}</td>
                <td>{parts[id].qty || "-"}</td>
                <td>
                  <table>
                    {#each ["exinfo", "exinfo2", "exinfo3", "exinfo4", "exinfo5"] as exinfoProp}
                      {#if parts[id].hasOwnProperty(exinfoProp)}
                        <tr>
                          <td>{parts[id][exinfoProp] || "-"}</td>
                        </tr>
                      {/if}
                    {/each}
                  </table>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else if id}
    
  {/if}
</main>
