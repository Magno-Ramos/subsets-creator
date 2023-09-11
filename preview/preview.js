/**
         * The main function
         * 
         * This function wil generate all the subsets from based on the main set
         * 
         * @param {*} mainSet 
         * @returns all the subset from a {mainSet}
         */
function generateExclusiveSubSets() {

    let hasDuplicateItems = mainSet.length !== new Set(mainSet).size
    if (hasDuplicateItems) {
        throw Error('There is duplicated elements')
    }

    // final sub set of items
    const finalSubSet = [];

    for (let index = 0; index < mainSet.length; index++) {
        const element = mainSet[index];

        // first, a sub set of himself
        const childSubSet = [[element]];

        // second, a sub set as concatenation with the others created set's
        for (let childIndex = 0; childIndex < finalSubSet.length; childIndex++) {
            const newSubSet = finalSubSet[childIndex].concat(element);
            childSubSet.push(newSubSet);
        }

        // now, adding all created set's to final list
        finalSubSet.push(...childSubSet)
    }

    return finalSubSet;
}

// ******************************************************************************************************************

const ANIM_DELAY = 300

const main = document.getElementById('main')
const result = document.getElementById('result')
const button = document.getElementById('button')
const inputField = document.getElementById('input-field')
const viewSetElements = []

var mainSet = []

/**
 * Run animation
 */
async function generateExclusiveSubSetsAnimated() {
    const subSetResult = generateExclusiveSubSets()

    button.disabled = true;
    inputField.disabled = true;
    result.innerHTML = "";

    for (let index = 0; index < subSetResult.length; index++) {
        const subSet = subSetResult[index];
        const stringResult = subSet.join(', ')
        addToResult(stringResult)
        await animate(subSet)
        await sleep(ANIM_DELAY)
    }

    addToResult('------------------------------------')
    addToResult(`${subSetResult.length} subset's`)
    addToResult('------------------------------------')

    inputField.disabled = false;
    button.disabled = false;
}

// Helper functions

function generateViewSetElements() {
    main.innerHTML = ''
    mainSet.forEach(e => {
        let div = document.createElement('div');
        div.innerHTML = e
        div.id = `box-${e}`
        div.classList.add('box');
        main.appendChild(div)
    })
}

function addToResult(content) {
    let div = document.createElement('div');
    div.innerHTML = content
    result.appendChild(div)
}

async function animate(subset) {
    subset.forEach(e => {
        let box = document.getElementById(`box-${e}`)
        box.classList.add('box-anim')
    })

    await sleep(ANIM_DELAY)

    subset.forEach(e => {
        let box = document.getElementById(`box-${e}`)
        box.classList.remove('box-anim')
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function onChangeInputField() {
    try {
        result.innerHTML = ''
        main.innerHTML = ''

        const array = inputField.value.split(',').filter(e => e.trim() !== '');

        if (array.length <= 0) {
            throw Error('Ther array cannot be empty')
        }

        if (array.some(e => !isNumeric(e) && e.trim() !== ',')) {
            throw Error('Invalid character')
        }

        if (array.length !== new Set(array).size) {
            throw Error('There is duplicated items')
        }

        mainSet = array
        button.disabled = false
        generateViewSetElements()

    } catch (error) {
        button.disabled = true
    }
}

function isNumeric(str) {
    if (typeof str !== "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

// DEFAULT VALUE

window.onload = _ => {
    inputField.value = '1, 3, 5'
    onChangeInputField()
}
