/// <reference path="types.d.ts" />

import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
import { rollDiceTokens } from "./diceRoller";
import { tokenizeDiceString } from "./tokenizer";

/**@param {string} diceString
 * @param {number?} targetNumber
 */
function rollDice(diceString, targetNumber = null) {
    const tokens = tokenizeDiceString(diceString);
    rollDiceTokens(tokens, targetNumber);
}

function waitForUserInput() {
    rl.question("Choose roll types (1 plain, 2 target): ", (rollType) => {
        if (rollType === "exit") {
            rl.close();
            return;
        }
        rl.question("Enter dice string: ", (diceString) => {
            if (rollType === "1") {
                rollDice(diceString);
                waitForUserInput();
            } else if (rollType === "2") {
                rl.question("Enter target number: ", (targetNumber) => {
                    rollDice(diceString, targetNumber);
                    waitForUserInput();
                });
            }
        });
    });
}

waitForUserInput();
