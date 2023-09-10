// At. Magno Ramos

// To run this code
// You can use Node JS 
// Ex. create a file like index.js, paste the code, run >> node index.js

// Also, you can use an online website to run this javascript code
// Ex. go to https://www.programiz.com/javascript/online-compiler/ paste the code, and run


// ************************************************************************************************************


/**
 * The main function
 * 
 * This function wil generate all the subsets from based on the main set
 * 
 * @param {*} mainSet 
 * @returns all the subset from a {mainSet}
 */
function generateExclusiveSubSets(mainSet) {

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

// Example
const mainSet = [1, 3, 5];
const result = generateExclusiveSubSets(mainSet);

console.log(`\nExample..\n`)
console.log(`Given a set ${mainSet}`)
console.log(`We'll receive the result bellow`)
console.log(result)


// ************************************************************************************************************


// Tests
function runTests() {

    /**
     * In this test
     * We expected the result of subsets have the count size of result
     */
    function givenExclusiveSubsets_thenTheResultMustHaveTheCorrectSize() {
        var elementsMock = [1, 3, 5]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(result.length === 7);

        var elementsMock = [1, 3, 6, 8]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(result.length === 15);

        var elementsMock = [1, 3, 6, 8, 9]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(result.length === 31);
    }

    /**
     * In this test
     * We expected the result of subsets dont't have duplicated arrays
     */
    function givenExclusiveSubsets_thenTheResultCantBeElementsWithTheSameResult() {
        var elementsMock = [1, 3, 5]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(!hasDuplicateArrays(result));

        var elementsMock = [1, 3, 6, 8]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(!hasDuplicateArrays(result));

        var elementsMock = [1, 3, 6, 8, 9]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(!hasDuplicateArrays(result));
    }

    /**
    * In this test
    * We expected the result uses really only the elements of the main set
    */
    function givenExclusiveSubsets_thenTheResultMustHaveOnlyItemsFromTheMainSet() {
        var elementsMock = [1, 3, 5]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(hasOnlyElementsFromMainSet(elementsMock, result));

        var elementsMock = [1, 3, 6, 8]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(hasOnlyElementsFromMainSet(elementsMock, result));

        var elementsMock = [1, 3, 6, 8, 9]
        var result = generateExclusiveSubSets(elementsMock);
        printTestResult(hasOnlyElementsFromMainSet(elementsMock, result));
    }

    /**
    * In this test
    * We expected the result correct subset result
    */
    function givenExclusiveSubsets_thenTheResultMustTheCorrectSubSetResult() {
        var elementsMock = [1, 3, 5]
        var result = generateExclusiveSubSets(elementsMock);
        var expectedResult = [[1], [3], [1, 3], [5], [1, 5], [3, 5], [3, 1, 5]]
        printTestResult(checkArrayAreEquals(result, expectedResult));

        elementsMock = [1, 3, 5, 7]
        result = generateExclusiveSubSets(elementsMock);
        expectedResult = [[1], [3], [1, 3], [5], [1, 5], [3, 5], [1, 3, 5], [7], [1, 7], [3, 7], [1, 3, 7], [5, 7], [1, 5, 7], [3, 5, 7], [1, 3, 5, 7]]
        printTestResult(checkArrayAreEquals(result, expectedResult));
    }

    // Helper test functions

    function printTestResult(testPassed) {
        if (testPassed) {
            console.log(`✅ Test passed`)
        } else {
            console.log(`❌ Test Error`)
        }
    }

    function checkArrayAreEquals(arr1, arr2) {
        arr1.forEach(e => e.sort((a, b) => a - b))
        arr2.forEach(e => e.sort((a, b) => a - b))
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    /**
     * @param {*} arrays the result after generate all subsets of the main set
     * @returns true if has elements duplicates in {arrays}
     */
    function hasDuplicateArrays(arrays) {
        const setOfJSONStrings = new Set();

        for (const array of arrays) {
            const jsonString = JSON.stringify(array.sort());

            if (setOfJSONStrings.has(jsonString)) {
                return true; // Found a duplicate subarray
            }

            setOfJSONStrings.add(jsonString);
        }

        return false;
    }

    /**
     * @param {*} mainSet the main set of numbers
     * @param {*} setResult the result after generate all subsets of the main set
     * @returns true if each array in {setResult} has only numbers present in the {mainSet} 
     */
    function hasOnlyElementsFromMainSet(mainSet, setResult) {
        for (let i = 0; i < setResult.length; i++) {
            const subarray = setResult[i];
            for (let j = 0; j < subarray.length; j++) {
                const element = subarray[j];
                if (!mainSet.includes(element)) {
                    return false;
                }
            }
        }
        return true;
    }

    // Running

    console.log(`\nRunning tests..\n`)

    givenExclusiveSubsets_thenTheResultMustHaveTheCorrectSize()
    givenExclusiveSubsets_thenTheResultCantBeElementsWithTheSameResult()
    givenExclusiveSubsets_thenTheResultMustHaveOnlyItemsFromTheMainSet()
    givenExclusiveSubsets_thenTheResultMustTheCorrectSubSetResult()
}

runTests()


