module.exports.validateRegisterInput = (
    username,
    password,
    confirmPassword,
    email
) => {
    let errors = {};

    if (username.trim() === '') errors.username = 'Username must not be empty';

    if (password === '') errors.password = 'Password must not be empty';
    else if (password !== confirmPassword)
        errors.confirmPassword = 'Passwords must match';

    if (email.trim() === '') errors.email = 'Email must not be empty';
    else {
        const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regex))
            errors.email = 'Email must be a valid email address';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateLoginInput = (username, password) => {
    let errors = {};

    if (username.trim() === '') errors.username = 'Username must not be empty';
    if (password.trim() === '') errors.password = 'Password must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
