<script lang="ts">
    import "../style/main.scss"
    import ColorCard from "$lib/ColorCard.svelte"
    import { ArrowClockwise, ArrowDown, Dash, Plus } from "svelte-bootstrap-icons"
    import { colorToBootstrapVariant, type ArrowCardId, type ColorCardId } from "$lib/shared"
    import { onMount } from "svelte"

    let currentArrowCard: ArrowCardId | undefined = undefined
    let currentColorCard: ColorCardId | undefined = undefined
    let row: ColorCardId[] = []

    let doubt = false
    let padding = 0

    const COLOR_CARDS: ColorCardId[] = [
        "001",
        "002",
        "003",
        "004",
        "005",
        "006",
        "007",
        "008",
        "009",
        "010",
        "011",
        "012",
        "013",
        "014",
        "015",
        "016",
        "017",
        "018",
        "019",
        "020"
    ]
    // const COLOR_CARDS: ColorCardId[] = ["020"]

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

    // onMount(() => {
    //     newRound()
    //     newTurn()
    // })
</script>

<div class="container-fluid">
    <main style={`padding-left: ${padding}px; padding-right: ${padding}px`}>
        {#if currentArrowCard !== undefined && currentColorCard !== undefined}
            <div class="row">
                <div class="col">
                    <div class="sticky-top d-flex flex-column min-vh-100">
                        <div class="flex-grow-1 py-3">
                            <ColorCard cardId={currentColorCard} {currentArrowCard} allowShowPercentages={doubt} />

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

                            <label for="zoomBtnGroup" class="form-label mt-5">Zoomen</label>

                            <div class="btn-group" role="group" id="zoomBtnGroup">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    disabled={padding >= 300}
                                    on:click={() => {
                                        padding = padding + 50
                                    }}><Dash /></button
                                >
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    disabled={padding === 0}
                                    on:click={() => {
                                        padding = padding - 50
                                    }}><Plus /></button
                                >

                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    disabled={padding === 0}
                                    on:click={() => {
                                        padding = 0
                                    }}>Reset</button
                                >
                            </div>
                        </div>

                        <footer class="py-3">
                            <a
                                href="/"
                                on:click={() => {
                                    location.reload()
                                }}
                                aria-label="Reload"
                                class="btn btn-light"><ArrowClockwise /> App neu starten</a
                            >
                        </footer>
                    </div>
                </div>

                <div class="col d-flex gap-1 flex-column py-3">
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
                        <ColorCard {cardId} {currentArrowCard} allowShowPercentages={doubt} />

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
            <div class="d-flex flex-column min-vh-100">
                <div class="text-center flex-grow-1">
                    <h1 class="display-1 mt-4 mb-3">
                        Illusion <small class="display-5"
                            >by <svg
                                class="bi"
                                fill-rule="evenodd"
                                stroke-linejoin="round"
                                stroke-miterlimit="2"
                                clip-rule="evenodd"
                                viewBox="0 0 800 798"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                ><circle
                                    cx="312.633"
                                    cy="318.133"
                                    r="50"
                                    transform="matrix(1.3072 0 0 1.30268 -8.671 -15.806)"
                                /><path
                                    fill-rule="nonzero"
                                    d="M682.843 116.752C607.293 41.462 506.843-.001 400-.001 293.155 0 192.707 41.464 117.156 116.752 41.607 192.042 0 292.144 0 398.62c0 106.474 41.608 206.577 117.157 281.867C192.706 755.777 293.155 797.24 400 797.24c106.843 0 207.293-41.463 282.843-116.753C758.393 605.197 800 505.094 800 398.62c0-106.476-41.607-206.578-117.157-281.868zm-96.616 99.016a261.625 261.625 0 0140.015 52.237l-48.403 48.236a195.809 195.809 0 00-37.831-54.413l46.22-46.06zM367.007 74.606A331.023 331.023 0 01400 72.948c10.924 0 21.717.554 32.367 1.597v131.34a197.775 197.775 0 00-65.36.1V74.605zm65.36 450.254V722.7a329.974 329.974 0 01-32.28 1.59c-13.89 0-27.85-.87-40.923-2.547v-.004c-1.307-.22-3.609-.467-5.366-.716-.683-.097-1.456-.185-2.138-.287a335.755 335.755 0 01-4.896-.771c-.85-.14-1.702-.276-2.551-.42a327.257 327.257 0 01-7.357-1.353c-1.562-.305-3.12-.616-4.675-.943-.846-.179-1.687-.365-2.53-.549a324.498 324.498 0 01-4.757-1.065c-.672-.158-1.339-.327-2.01-.489a323.606 323.606 0 01-16.375-4.403c-.788-.234-1.579-.46-2.364-.7a332.518 332.518 0 01-4.347-1.371c-.914-.293-1.827-.585-2.737-.886a348.386 348.386 0 01-11.077-3.882c-.952-.353-1.897-.716-2.845-1.077-1.342-.512-2.686-1.024-4.02-1.553-.918-.365-1.83-.744-2.743-1.116a326.447 326.447 0 01-7.89-3.336c-.785-.344-1.575-.678-2.356-1.027-1.212-.543-2.413-1.107-3.617-1.665-1.031-.477-2.065-.95-3.09-1.438-1.166-.555-2.323-1.123-3.481-1.69a309.352 309.352 0 01-3.16-1.567 340.67 340.67 0 01-9.828-5.16 308.45 308.45 0 01-3.344-1.862c-1.012-.57-2.028-1.135-3.033-1.715-1.3-.749-2.585-1.516-3.873-2.282-.807-.48-1.62-.948-2.42-1.436a326.016 326.016 0 01-5.973-3.715c-.825-.525-1.64-1.065-2.46-1.598a323.72 323.72 0 01-3.708-2.432c-.877-.587-1.745-1.183-2.617-1.778a335.437 335.437 0 01-3.476-2.401 333.908 333.908 0 01-6.05-4.353c-.828-.61-1.656-1.219-2.478-1.836a324.77 324.77 0 01-3.627-2.772c-.726-.562-1.456-1.117-2.177-1.684a326.349 326.349 0 01-4.634-3.719c-.351-.288-.71-.568-1.061-.856a326.52 326.52 0 01-5.55-4.676c-.589-.507-1.168-1.024-1.752-1.535a323.73 323.73 0 01-3.757-3.322c-.689-.62-1.37-1.248-2.054-1.874a300.106 300.106 0 01-5.461-5.116 329.149 329.149 0 01-3.28-3.191c-.665-.657-1.332-1.312-1.992-1.975-.314-.315-.62-.636-.933-.952l46.51-45.735c-46.5-47.035-75.193-111.598-75.193-182.84 0-72.45 29.675-137.992 77.572-185.216l46.217 46.058c-36.07 35.436-58.429 84.695-58.429 139.158 0 53.412 21.505 101.818 56.356 137.091l-46.523 45.749c40.146 40.608 93.568 68.143 153.253 75.634V524.7c-56.22-14.57-97.727-65.493-97.727-126.08 0-71.946 58.526-130.268 130.72-130.268 72.193 0 130.719 58.322 130.719 130.268 0 60.81-41.815 111.887-98.352 126.24zm199.706 103.05l-92.434-92.115a195.79 195.79 0 0037.887-54.127l95.81 95.479a327.405 327.405 0 01-41.263 50.763z"
                                /></svg
                            ></small
                        >
                    </h1>

                    <button
                        type="button"
                        class="btn btn-lg btn-primary mb-5"
                        on:click={() => {
                            newRound()
                            newTurn()
                        }}>Spiel starten</button
                    >
                </div>

                <div class="container text-secondary small">
                    <p>
                        Entwickelt von Lars Gerrit Kliesing mit SvelteKit, gehostet auf Vercel.<br />
                        &copy; 2023-{new Date().getFullYear()} LGK.
                        <a
                            class="text-secondary"
                            href="https://github.com/lgkonline/illusion"
                            target="_blank"
                            rel="noopener noreferrer">GitHub</a
                        >
                        <a class="text-secondary" href="https://lgk.io" target="_blank" rel="noopener noreferrer"
                            >Meine Website</a
                        >
                        <a
                            class="text-secondary"
                            href="https://lgk.io/site/imprint"
                            target="_blank"
                            rel="noopener noreferrer">Impressum</a
                        >
                        <a
                            class="text-secondary"
                            href="https://lgk.io/site/legal"
                            target="_blank"
                            rel="noopener noreferrer">Datenschutzerklärung</a
                        >
                    </p>
                </div>
            </div>
        {/if}
    </main>
</div>
