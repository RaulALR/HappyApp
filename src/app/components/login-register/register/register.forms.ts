export const registerForms = [
    {
        name: 'email',
        validators: ['required', 'email'],
        errors: [
            {
                error: 'required',
                msg: 'register.title'
            },
            {
                error: 'email',
                msg: 'Email'
            }
        ]
    },
    {
        name: 'password',
        validators: ['required'],
        errors: [
            {
                error: 'required',
                msg: 'Password is required'
            }
        ]
    },
    {
        name: 'repeatPassword',
        validators: ['required'],
        errors: [
            {
                error: 'required',
                msg: 'Repeat password is required'
            }
        ]
    }
];
