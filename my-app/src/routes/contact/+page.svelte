<script lang="ts">
    let name = '';
    let email = '';
    let message = '';
    let statusMessage = '';
    let isLoading = false;

    async function handleSubmit(event) {
        isLoading = true;
        statusMessage = 'Sending...';

        const formData = new FormData(event.target);
        const contactDetails = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: contactDetails.name,
                    email: contactDetails.email,
                    message: contactDetails.message
                })
            });

            const result = await response.json();

            if (response.ok) {
                statusMessage = '✅ Success! Your message has been sent.';
                event.target.reset();
            } else {
                statusMessage = `❌ Error: ${result.error || 'Something went wrong.'}`;
            }
        } catch (error) {
            statusMessage = '❌ An error occurred. Please try again.';
            console.error(error);
        } finally {
            isLoading = false;
        }
    }
</script>

<section class="contact-container">
    <h1>Contact Us</h1>
    <p class="subtitle">Please complete the form below</p>

    <form class="contact-form" on:submit|preventDefault={handleSubmit}>
        <label>
            Name
            <input type="text" bind:value={name} required />
        </label>
        <label>
            Email
            <input type="email" bind:value={email} required />
        </label>
        <label>
            Message
            <textarea rows="5" bind:value={message} required></textarea>
        </label>
        <button type="submit">Submit</button>
    </form>

    {#if statusMessage}
        <div class="sent-message">{statusMessage}</div>
    {/if}
</section>

<style>
    .contact-container {
        max-width: 600px;
        margin: 4rem auto;
        padding: 2rem;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }
    h1 {
        font-size: 1.5rem;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-align: center;
        margin-bottom: 1rem;
    }
    .subtitle {
        text-align: center;
        margin-bottom: 3rem;
        color: #888;
        font-size: 0.9rem;
    }
    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    label {
        font-size: 0.8rem;
        color: #555;
        text-transform: uppercase;
    }
    input,
    textarea {
        width: 100%;
        padding: 0.75rem 0;
        margin-top: 0.5rem;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 1rem;
        font-family: inherit;
        background: transparent;
        transition: border-color 0.2s;
    }
    input:focus,
    textarea:focus {
        outline: none;
        border-bottom-color: #333;
    }
    button {
        background: #fff;
        color: #333;
        border: 1px solid #ccc;
        padding: 0.75rem 2rem;
        font-size: 0.8rem;
        font-family: inherit;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s;
        align-self: flex-start;
        margin-top: 1rem;
    }
    button:hover {
        background: #333;
        color: #fff;
        border-color: #333;
    }
    .sent-message {
        margin-top: 2rem;
        text-align: center;
        color: #333;
    }
</style>
