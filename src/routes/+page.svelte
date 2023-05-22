<script lang="ts">
  import type { CreateCompletionResponse } from "openai";
  import { SSE } from "sse.js";

  let context = "";
  let loading = false;
  let error = false;
  let answer = "";
  let lastSent = "";

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    answer = "";
    loading = true;
    error = false;

    const eventSource = new SSE("/api/bias", {
      headers: {
        "Content-Type": "application/json",
      },
      payload: JSON.stringify({ context }),
    });

    lastSent = context;
    context = "";

    eventSource.addEventListener("error", (e) => {
      console.log(e);
      error = true;
      loading = false;
    });

    eventSource.addEventListener("message", (e) => {
      try {
        loading = false;

        if (e.data === "[DONE]") {
          return;
        }

        const completionResponse: CreateCompletionResponse = JSON.parse(e.data);

        const [{ text }] = completionResponse.choices;

        answer = (answer ?? "") + text;
      } catch (err) {
        error = true;
        loading = false;
        console.error(err);
        alert("PAIN");
      }
    });

    eventSource.stream();
  };
</script>

<head>
  <script
    src="https://kit.fontawesome.com/b47c749bc2.js"
    crossorigin="anonymous"
  ></script>
</head>

<body>
  <div class="center">
    <h1>Bias Buster</h1>
  </div>

  <form on:submit|preventDefault={() => handleSubmit()}>
    <label for="context">Enter a question you want to check for bias</label>
    <textarea
      name="context"
      rows="3"
      placeholder={lastSent}
      bind:value={context}
    />
    <button>Submit</button>
    <div class="pt-2 pb-2">
      <h2>Result</h2>
    </div>
  </form>

  <div class="center">
    {#if answer}
      <p>{answer}</p>
    {/if}
    {#if loading}
      <i class="fa-solid fa-spinner fa-spin-pulse" />
    {/if}
    {#if error}
      <p>Something went wrong</p>
    {/if}
  </div>
  <footer>
    <p>AP Statistics Final Project</p>
    <p>
      <!-- <a href="https://github.com/Puumpkin"><i class="fa-brands fa-github" /></a -->
    </p>
  </footer>
</body>

<style>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
