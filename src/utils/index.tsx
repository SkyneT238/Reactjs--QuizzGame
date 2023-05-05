export function isValidName(input: string): boolean {
    const regex = /^[A-Za-z ]+$/;

    if (input.length ==0) return false;
    if (!regex.test(input))
        return false;

    return true;

}