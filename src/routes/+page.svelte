<script lang="ts">
    import "../style/main.scss"
    import ColorCard from "$lib/ColorCard.svelte"
    import { ArrowClockwise, ArrowDown } from "svelte-bootstrap-icons"
    import { colorToBootstrapVariant, type ArrowCardId, type ColorCardId } from "$lib/shared"
    import { onMount } from "svelte"

    let currentArrowCard: ArrowCardId | undefined = undefined
    let currentColorCard: ColorCardId | undefined = undefined
    let row: ColorCardId[] = []

    let doubt = false

    const COLOR_CARDS: ColorCardId[] = ["001", "002"]

    let colorCards: ColorCardId[] = [...COLOR_CARDS]

    let arrowCards: ArrowCardId[] = [
        "red",
        "green",
        "blue",
        "yellow",
        "red",
        "green",
        "blue",
        "yellow",
        "red",
        "green",
        "blue",
        "yellow"
    ]

    function newRound() {
        // Zufälligen Index generieren
        const randomIndex = Math.floor(Math.random() * arrowCards.length)

        if (!arrowCards[randomIndex]) {
            alert("Spiel ist zu Ende! Spielerin oder Spieler mit den meisten Punkten hat gewonnen.")
        }

        // Die gezogene Pfeilkarte
        currentArrowCard = arrowCards[randomIndex]

        arrowCards.splice(randomIndex, 1)
        arrowCards = [...arrowCards]
    }

    function newTurn() {
        const randomIndex = Math.floor(Math.random() * colorCards.length)

        if (!colorCards[randomIndex]) {
            if (confirm("Keine Farbkarten mehr übrig. Neu mischen?")) {
                colorCards = [...COLOR_CARDS]
                newTurn()
                return
            }
        }

        currentColorCard = colorCards[randomIndex]

        colorCards.splice(randomIndex, 1)
        colorCards = [...colorCards]
    }

    onMount(() => {
        newRound()
        newTurn()
    })
</script>

<div class="container-fluid d-flex flex-column py-1" style="min-height: 100vh;">
    <main class="flex-grow-1">
        {#if currentColorCard !== undefined}
            <div class="row">
                <div class="col">
                    <div class="sticky-top">
                        <ColorCard cardId={currentColorCard} allowShowPercentages={doubt} />

                        <button
                            type="button"
                            class="btn btn-lg btn-primary w-100 mt-5"
                            disabled={doubt}
                            on:click={() => {
                                doubt = true
                            }}>Anzweifeln</button
                        >
                        <button
                            type="button"
                            class="btn btn-lg btn-primary w-100 mt-3"
                            disabled={!doubt}
                            on:click={() => {
                                doubt = false
                                row = []
                                newRound()
                            }}>Neue Runde</button
                        >
                    </div>
                </div>

                <div class="col d-flex gap-1 flex-column">
                    {#if currentArrowCard !== undefined}
                        <div
                            class={`text-${colorToBootstrapVariant(
                                currentArrowCard
                            )} border border-5 border-${colorToBootstrapVariant(
                                currentArrowCard
                            )} rounded-5 display-1 text-center`}
                        >
                            <ArrowDown width="1em" height="1em" />
                        </div>
                    {/if}

                    <button
                        type="button"
                        class="btn btn-secondary"
                        on:click={() => {
                            if (currentColorCard) {
                                row.unshift(currentColorCard)
                                row = [...row]
                                newTurn()
                            }
                        }}>Hier ablegen</button
                    >

                    {#each row as cardId, index}
                        <ColorCard {cardId} allowShowPercentages={doubt} />

                        <button
                            type="button"
                            class="btn btn-secondary"
                            on:click={() => {
                                if (currentColorCard) {
                                    row.splice(index + 1, 0, currentColorCard)
                                    row = [...row]
                                    newTurn()
                                }
                            }}>Hier ablegen</button
                        >
                    {/each}
                </div>
            </div>
        {:else}
            <button
                type="button"
                class="btn btn-primary"
                on:click={() => {
                    newRound()
                    newTurn()
                }}>Spiel starten</button
            >
        {/if}
    </main>

    <footer>
        <a
            href="/"
            on:click={() => {
                location.reload()
            }}
            aria-label="Reload"
            class="btn btn-light"><ArrowClockwise /></a
        >
    </footer>
</div>
