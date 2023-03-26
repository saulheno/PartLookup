<script>
    export let parts;
    export let imageUrl;
    export let id;
    export let searchID;
</script>

{#if parts !== null && parts !== "None"}
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
{:else if parts === "None"}
<p>No parts were found for {searchID}</p>
{/if}