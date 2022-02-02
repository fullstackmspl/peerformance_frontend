
export const PAGES = {
    SIGN_UP: {
        FORM: {
            FIRST_NAME: {
                LABEL: 'First name',
                PLACEHOLDER: 'Enter your first name'
            },
            LAST_NAME: {
                LABEL: 'Last name',
                PLACEHOLDER: 'Enter your last name'
            },
            EMAIL: {
                LABEL: 'Email Address',
                PLACEHOLDER: 'Enter your email'
            },
            PASSWORD: {
                LABEL: 'Password',
                PLACEHOLDER: 'Enter your password'
            },
            CONFIRM_PASSWORD: {
                LABEL: 'Confirm Password',
                PLACEHOLDER: 'Confirm your password'
            }
        },
        CONFIRMATION_POPUP: {
            TITLE: 'Confirmation',
            TEXT: 'Already exist account for this domain? Are you sure you want to create new one account for this domain ?'
        },
        TERMS_CONDITIONS_POPUP: {
            Title: "Terms and Conditions",
            LastUpdated: "Last updated August 12, 2021",
            Terms: [
                {
                    Title: "Terms",
                    Content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },
                {
                    Title: "Terms",
                    Content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
            ],
            Conditions: [
                {
                    Title: "Conditions",
                    Content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },
                {
                    Title: "Conditions",
                    Content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
            ]
        },
        MESSAGES: {
            CREATED_ACCOUNT: 'Created new account. Check your email!',
            EMAIL_SENT: 'An email has been sent with a link to activate your account.',
            ACCOUNT_EXIST: 'Account exist !',
            FILL_REQUIRED_FIELDS: 'Please fill in the required fields'

        }
    },
    COMPANY_INFORMATIONS: {
        FIELDS: {
            QUESTION1: {
                LABEL: 'Security question 1',
                PLACEHOLDER: 'Select a question'
            },
            QUESTION2: {
                LABEL: 'Security question 2'
            },
            ANSWER1: {
                LABEL: 'Answer 1',
                PLACEHOLDER: 'Enter your answer'
            },
            ANSWER2: {
                LABEL: 'Answer 2',
            },
            COMPANY_NAME: {
                LABEL: 'Company Name',
                PLACEHOLDER: 'Enter company name',
                NOTIFICATION: 'We need this to be able to compare you to businesses of a similar size'
            },
            CONTACT_EMAIL: {
                LABEL: 'Authorization contact email',
                PLACEHOLDER: 'Enter authorization contact email',
                NOTIFICATION: 'We need this to be able to compare you to businesses of a similar size'
            },
            SELF_AUTHORIZATION: {
                LABEL: 'Self authorization'
            },
            NUMBER_OF_EMPLOYEES: {
                LABEL: 'Number of employees'
            },
            ANNUAL_REVENUE: {
                LABEL: 'Annual Revenue'
            },
            COMPANY_REACH: {
                LABEL: 'Company reach (Global, Local, UK)'
            }
        },
        MESSAGES: {
            DIFFERENT_EMAIL: 'E-mail address must be different from the one specified in the questionnaire.\nYou cannot authorize yourself.',
            EMAIL_FROM_THE_SAME_DOMAIN: 'The authorization contact email must come from the same domain.'
        }
    },
    EMAIL_AUTH: {
        MESSAGES: {
            ACTIVATION_LINK_SENT: 'Activation link has been sent.',
            SUCCESSFULLY_AUTHORIZED: 'User has been successfully authorized.',
            TOKEN_FAILED: 'Token failed: '
        }
    },
    DASHBOARD: {
        
    }

}

export const BUTTONS = {
    SIGN_UP: 'Sign up',
    NEXT: 'Next',
    SUBMIT: 'Submit',
    ACCEPT: 'Accept',
    DECLINE: 'Decline',
    NO: 'No',
    YES: 'Yes'
}
