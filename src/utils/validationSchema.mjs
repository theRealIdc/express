export const createUserValidationsSchema = {
    name: {
        isLength: {
            options: {
                min: 5,
                max: 32,
            },
            errorMessage:
                "Name must be at least 5 characters with a max 32 characters",

        },
        notEmpty: {
            errorMessage: "Name not be empty",
        },
        isString: {
            errorMessage: "Name must be a string",
        },
    },

    email: {
        isEmail: {
            errorMessage:
                "value must be a email"
        },
        notEmpty: {
            errorMessage: "Email not be empty"
        }

    },

};