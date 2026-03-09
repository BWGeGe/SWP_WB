type Result<T, E> =
    | { type: "success"; value: T }
    | { type: "error"; error: E };

function checkEmailNeverThrow(email: string): Result<string, Error> {
    const emailRegex = /^\w+\@\w+\.\w+$/;
    if (emailRegex.test(email)) {
        return { type: "success", value: "Valid email: " + email };
    }
    return { type: "error", error: new Error("Invalid email") };
}

function checkEmailTryCatch(email: string): string {
    try {
        const emailRegex = /^\w+\@\w+\.\w+$/;
        if (emailRegex.test(email)) {
            return "Valid email: " + email;
        }
        throw new Error("Invalid email");
    } catch (error) {
        return "Error: " + error;
    }
}

console.log(checkEmailNeverThrow("brz210319@spengergasse.at"));
console.log(checkEmailNeverThrow("brz210319@spen§!§gergasse.1234"));
console.log(checkEmailTryCatch("brz210319@spengergasse.at"));
console.log(checkEmailTryCatch("brz210319@spen§!§gergasse.1234"));
