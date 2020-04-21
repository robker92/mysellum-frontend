// ./customValidators/passwordComplexity.js
export default password => {
    // Minimum of 1 Uppercase Letter
    if (/[A-Z]/.test(password) == false) return false

    // Minimum of 1 Number
    if (/\d/.test(password) == false) return false

    // Minimum of 6 Characters
    // separately targeting input length to provide specific error message

    return true
}