<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
  import { getPartsById } from './mongo.js';
  import { getImageUrl } from './storage.js';
    import { each, loop_guard } from 'svelte/internal';

  let id = '';
  let parts = null;
  let imageUrl = '';

  async function handleSubmit(event) {
    event.preventDefault();
    parts = await getPartsById(id);
    imageUrl = await getImageUrl(id);
  }
</script>

<main>
  <h1>Part Lookup</h1>
  <form on:submit={handleSubmit}>
    <label>
      ID:
      <input type="text" bind:value={id} />
    </label>
    <button type="submit">Search</button>
  </form>
  {#if parts}
    <h2>{id}</h2>
    <img src={imageUrl} alt={id} />
    <table>
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
            <td><table>     
              {#if parts[id].hasOwnProperty('partno')}
                <tr>
                  
                  <td>{parts[id].partno || '-'}</td>
                  
                </tr>
              {/if}

              {#if parts[id].hasOwnProperty('partno2')}
                <tr>
                  
                  <td>{parts[id].partno2 || '-'}</td>
                  
                </tr>
              
              {/if}

              {#if parts[id].hasOwnProperty('partno3')}
                <tr>
                  
                  <td>{parts[id].partno3 || '-'}</td>
                  
                </tr>
              
              {/if}

              {#if parts[id].hasOwnProperty('partno4')}
                <tr>
                  
                  <td>{parts[id].partno4 || '-'}</td>
                  
                </tr>
              
              {/if}

              {#if parts[id].hasOwnProperty('partno5')}
                <tr>
                  
                  <td>{parts[id].partno5 || '-'}</td>
                  
                </tr>
              
              {/if}

            
            </table></td>
            <td>{parts[id].partname}</td>
            <td>{parts[id].qty}</td>
            <td><table>     
              {#if parts[id].hasOwnProperty('exinfo')}
                <tr>
                  
                  <td>{parts[id].exinfo || '-'}</td>
                  
                </tr>
              {/if}

              {#if parts[id].hasOwnProperty('exinfo2')}
                <tr>
                  
                  <td>{parts[id].exinfo2 || '-'}</td>
                  
                </tr>
              
              {/if}

              {#if parts[id].hasOwnProperty('exinfo3')}
                <tr>
                  
                  <td>{parts[id].exinfo3 || '-'}</td>
                  
                </tr>
              
              {/if}

              {#if parts[id].hasOwnProperty('exinfo4')}
                <tr>
                  
                  <td>{parts[id].exinfo4 || '-'}</td>
                  
                </tr>
              
              {/if}

              {#if parts[id].hasOwnProperty('exinfo5')}
                <tr>
                  
                  <td>{parts[id].exinfo5 || '-'}</td>
                  
                </tr>
              
              {/if}

            </table></td>

          </tr>
        {/each}
      </tbody>
    </table>
  {:else if id}
    <p>No parts found for ID {id}</p>
  {/if}
</main>

