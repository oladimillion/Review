## Review

An employee performance review app

### Create virtual environment

`python3 -m venv env`

### Create environment variables

`touch .env`

copy `.env_example` into `.env` and update the variables accordingly

### Activate virtual environment

`source env/bin/activate`

### Install dependencies

`pip3 install -r requirements.txt`

`npm install`

### Make migrations

`./manage.py makemigrations`

`./manage.py makemigrations api`

### Migrate database

`./manage.py migrate`

### Create superuser

`./manage.py createsuperuser`

### Run development server

`./manage.py runserver`

`npm start`

### Log in as a superuser to create an admin user

`http://127.0.0.1:8000/admin/api/member/add/`

### Log in with the created admin user to create basic users

`http://localhost:3000/login`

### Log in with the created basic users to submit feedback to other employee's performance

`http://localhost:3000/login`

### API documentation

`http://127:0.0.1:8000/api/v1/swagger`

### Technologies used

- React (frontend framework)
- MobX (state management for React)
- Django (backend framework)
- django-rest-framework (API framework for Django)
