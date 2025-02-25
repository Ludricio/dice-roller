/// <reference path="types.d.ts"/>

/** @param {Token} tokens
 * @param {number?} rollTarget
 */
export function rollDiceTokens(tokens, rollTarget = null) {
    let fullValue = 0;
    const rollBreakdown = [];

    /**@type {("none"|"add"|"subtract")} */
    let currentModifier = "none";
    tokens.forEach((token) => {
        if (token.type === "dice") {
            const breakdown = calculateDiceRoll(token.value);
            rollBreakdown.push(breakdown);
            fullValue = applyValue(
                fullValue,
                breakdown.resultValue,
                currentModifier,
                true,
            );
        } else if (token.type === "flatValue") {
            const value = parseInt(token.value);
            fullValue = applyValue(fullValue, value, currentModifier);
        } else if (token.type === "operator") {
            currentModifier = token.value === "+" ? "add" : "subtract";
        }
    });
    console.clear();
    console.log("Formula", tokens);
    console.log("Result breakdown", rollBreakdown);
    console.log("");

    if (rollTarget) {
        console.log("Full value", fullValue);
        const targetResult = rollTarget - fullValue;
        console.log("Target result", targetResult);
        const success = targetResult >= 0;
        console.log("Success", success);
        const degrees = Math.floor(Math.abs(targetResult) / 10) + 1;
        console.log("Degrees", degrees);
        console.log("Target", rollTarget);
        console.log(
            `Roll ${success ? "is successful" : "failed"}. ${degrees} degrees of ${success ? "success" : "failure"}`,
        );
        console.log("Target result", targetResult);
    }
    console.log("Total", fullValue);
    console.log("");
}

/** @param {string} diceString */
function calculateDiceRoll(diceString) {
    const splits = diceString.split("d").filter((val) => val !== "");

    let dice;
    if (splits.length === 1) {
        dice = {
            count: 1,
            sides: parseInt(splits[0]),
        };
    } else if (splits.length === 2) {
        dice = {
            count: parseInt(splits[0]),
            sides: parseInt(splits[1]),
        };
    } else if (splits.length === 3) {
        dice = {
            count: parseInt(splits[0]),
            sides: parseInt(splits[1]),
            drop: parseInt(splits[2]),
        };
    }
    const rolls = [];
    for (let i = 0; i < dice.count; i++) {
        const value = Math.floor(Math.random() * dice.sides) + 1;
        rolls.push(value);
    }
    let usedRolls = rolls;
    if (dice.drop) {
        usedRolls.sort((a, b) => a - b);
        usedRolls = usedRolls.slice(dice.drop);
    }
    const total = usedRolls.reduce((acc, val) => acc + val, 0);
    return {
        formula: diceString,
        rolls: rolls,
        resultValue: total,
    };
}

/**
 * @param {number} totalValue
 * @param {number} value
 * @param {("none"|"add"|"subtract")} modifier
 * @param {bool?} allowDefault
 */
function applyValue(totalValue, value, modifier, allowDefault = false) {
    switch (modifier) {
        case "none":
            return value;
        case "subtract":
            return totalValue - value;
        case "add":
            return totalValue + value;
        default:
            if (allowDefault) {
                return totalValue + value;
            }
            throw new Error("Unexpected modifier: " + modifier);
    }
}
