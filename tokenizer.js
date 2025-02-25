/// <reference path="types.d.ts" />

const operators = ["+", "-"];
const scopeBegin = "(";
const scopeEnd = ")";
const specialTokens = [...operators, scopeEnd, scopeBegin];

/** @param {string} diceString
 */
export function tokenizeDiceString(diceString) {
    /**@type {Token[]} */
    const tokens = [];
    let curTokenStart = 0;
    let curPos;
    for (curPos = 0; curPos < diceString.length; curPos++) {
        const char = diceString[curPos];
        if (specialTokens.includes(char)) {
            if (specialTokens.includes(char)) {
                const tokenValue = diceString.slice(curTokenStart, curPos);
                const rollToken = createToken(
                    tokenValue.includes("d") ? "dice" : "flatValue",
                    tokenValue,
                );
                /**@type {Token} */
                let specialToken;
                switch (char) {
                    case scopeBegin:
                        specialToken = createToken("scopeStart", char);
                        break;
                    case scopeEnd:
                        specialToken = createToken("scopeEnd", char);
                        break;
                    default:
                        specialToken = createToken("operator", char);
                        break;
                }
                curTokenStart = curPos + 1;
                tokens.push(rollToken, specialToken);
            }
        }
    }
    const tokenValue = diceString.slice(curTokenStart, curPos);
    const rollToken = createToken(
        tokenValue.includes("d") ? "dice" : "flatValue",
        tokenValue,
    );
    tokens.push(rollToken);
    return tokens;
}

/**
 * @param {TokenType} type
 * @param {string} value
 * @returns {Token}
 */
function createToken(type, value) {
    return { type, value };
}
