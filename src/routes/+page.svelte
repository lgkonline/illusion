<script lang="ts">
    import "../style/main.scss"
    import Card from "$lib/Card.svelte"

    type CardId = string

    let currentCard: CardId = "001"
    let row: CardId[] = []

    function nextRound() {
        currentCard = "002"
    }
</script>

<div class="container-fluid">
    <div class="row">
        <div class="col col-md-7"><Card cardId={currentCard} /></div>

        <div class="col col-md-5">
            <button
                type="button"
                class="btn btn-secondary"
                on:click={() => {
                    row.unshift(currentCard)
                    row = [...row]
                    nextRound()
                }}>Hier ablegen</button
            >

            {#each row as cardId, index}
                <Card {cardId} />

                <button
                    type="button"
                    class="btn btn-secondary"
                    on:click={() => {
                        row.splice(index + 1, 0, currentCard)
                        row = [...row]
                        nextRound()
                    }}>Hier ablegen</button
                >
            {/each}
        </div>
    </div>
</div>
