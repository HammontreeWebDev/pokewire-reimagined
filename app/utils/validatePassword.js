function validatePassword(password) {
    // Regex explained:
    // ^                 : start of string
    // (?=.*[a-z])       : at least one lowercase letter
    // (?=.*[A-Z])       : at least one uppercase letter
    // (?=.*\d)          : at least one number
    // (?=.*[\W_])       : at least one special character (non-word characters plus underscore)
    // .{8,}             : at least 8 characters
    // $                 : end of string
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
}

export default validatePassword;