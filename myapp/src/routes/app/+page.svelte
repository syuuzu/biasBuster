<script lang="ts">
	import type { CreateCompletionResponse } from 'openai'
	import { SSE } from 'sse.js'

    let context = ''
    let loading = false
    let error = false
    let answer = ''

    const handleSubmit = async () => {
        loading = true 
        error = false
        

        const eventSource = new SSE('/api/bias', {
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ context })
        })

        context = ''

        eventSource.addEventListener('error', (e) => {
            console.log(e)
            error = true
            loading = false
        })

        eventSource.addEventListener('message', (e) => {
            try {
                loading = false

                if(e.data === '[DONE]'){
                    return 
                }

                const completionResponse: CreateCompletionResponse = JSON.parse(e.data)

                const [{text}] = completionResponse.choices

                answer = (answer ?? '') + text

            } catch (err){
                error = true
                loading = false 
                console.error(err)
                alert('PAIN')
            }
        })

        eventSource.stream()
    }

</script>


<h1> Bais Buster </h1>
<form on:submit|preventDefault={() => handleSubmit}>
    <label for="context">Enter a question you want to check:</label>
    <textarea name="context" rows="2" bind:value={context} />
    <button>Submit</button>
    <div class="pt-4">
        <h2>Response:</h2>
        {#if answer}
        <p>{answer}</p>
        {/if}
    </div>

</form>