declare global {
    type TestType = string | number;
    type TokenType =
        | "operator"
        | "scopeStart"
        | "scopeEnd"
        | "flatValue"
        | "dice";

    interface Token {
        type: TokenType;
        value: string;
    }

    interface Rollbreakdown {
        formula: string;
        rolls: number[];
        resultValue: number;
    }
}

export {};
