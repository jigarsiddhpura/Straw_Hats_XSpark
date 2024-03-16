# Project Name

## Introduction

Introduce your project here.

## Getting Started

### Prerequisites

- Python 3.x
- pip

### Setup

1. Clone the repository.
2. Navigate to the project directory.

### Creating a Virtual Environment
python -m virtualenv venv
3. Activate the virtual environment.
    - On Windows: `venv\Scripts\activate`
    - On macOS/Linux: `source venv/bin/activate`

4. Install the required packages.
    ```bash
    pip install -r requirements.txt
    ```

5. Start the Django development server.
    ```bash
    python manage.py runserver
    ```
<!-- Write instruction to readme to add config.json of firebase to firebase/config.json. -->
6. Create a file named `config.json` in the `firebase` directory and add the following content to it.
    ```json
    {
        "
        apiKey
        ": "
        YOUR_API_KEY
        ",
        "
        authDomain
        ": "
        YOUR_AUTH_DOMAIN
        ",
        "
        projectId
        ": "
        YOUR_PROJECT_ID
        ",
        "
        storageBucket
        ": "
        YOUR_STORAGE_BUCKET
        ",
        "
        messagingSenderId
        ": "
        YOUR_MESSAGING_SENDER_ID
        ",
        "
        appId
        ": "
        YOUR_APP_ID
        ",
        "
        measurementId
        ": "
        YOUR_MEASUREMENT_ID
        "}
    ```
    Replace
    `YOUR_API
    _KEY
    `,
    `YOUR_AUTH
    _DOMAIN
    `,
    `YOUR_PROJECT
    _ID
    `,
    `YOUR_STORAGE
    _BUCKET
    `,
    `YOUR_MESSAGING
    _SENDER_ID
    `,
    `YOUR_APP
    _ID
    `,
    and `YOUR
    _MEASUREMENT_ID
    ` with your Firebase project's configuration.



