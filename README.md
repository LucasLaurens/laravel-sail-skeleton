# laravel-sail-skeleton
_This project corresponds to a small “skeleton” in order to have a key application representing an environment very close to production.
The project is based on the Laravel framework and its Docker management package, Sail.
There are a few small steps to follow during installation, however, to get our application up and running._

## Environment
### Requirements
To get started correctly and have the minimum required to run your application locally, 
you must define or redefine these variables (.env) : 
```
## Base
APP_NAME=the_app_name
APP_ENV=local
APP_KEY= ### php artisan key:generate
APP_SERVICE=${APP_NAME}.test
APP_URL=https://app.${APP_SERVICE}

## Locale
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en

## DB
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=the_db_name
DB_USERNAME=sail ### default
DB_PASSWORD=password ### default
```

As you can see, this skeleton is also based on MySQL. 
However, it is entirely possible to change this from the docker-compose at your convenience.

## Installation
First, you can install the packages that will be automatically instantiated 
after you launch the containers for the first time.
```bash
composer install
```

To begin with, you need to pull and pull up the application via Docker.
```bash
docker compose up -d --force-recreate 
```

To restart this process and avoid caching, 
you can run the command with this flag : [`--force-recreate`](https://docs.docker.com/reference/cli/docker/compose/up/#description)

The next step is to run the migrations and generate the application key : 
```bash
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
```

## Certificate
The application works with “mkcert” and “traefik” 
in order to have URLs and an application that are as close as possible to production. 
You must therefore complete the docker-compose 
but also generate the certificates locally and then on your various environments.

```bash
mkcert -cert-file certs/${APP_SERVICE}.cert \
       -key-file certs/${APP_SERVICE}.test.key \
       app.${APP_SERVICE} traefik.${APP_SERVICE} "*.${APP_SERVICE}" 127.0.0.1
```

You need to generate it for all the URLs you want to reach. E.g. “app.test”, “traefik.test”.

From a "MacOS" (but the same logic applies from Linux or Windows in a different location), 
you need to enter the URLs linked to the contracts from the “hosts” file. In “/etc/hosts,” 
enter the URLs used, for example :
```bash
127.0.0.1 app.laravel-sail-skeleton.test traefik.laravel-sail-skeleton.test
```

## Details
The important packages used to improve the scalability and maintainability of the application are:
- laravel/pulse => Laravel Pulse delivers at-a-glance insights into your application's performance and usage. 
With Pulse, you can track down bottlenecks like slow jobs and endpoints, find your most active users, and more.
- laravel/pint => Laravel Pint is an opinionated PHP code style fixer for minimalists. 
Pint is built on top of PHP CS Fixer 
and makes it simple to ensure that your code style stays clean and consistent.
- larastan/larastan => PHPStan scans your whole codebase and looks for both obvious & tricky bugs. 
Even in those rarely executed if statements that certainly aren't covered by tests.

You can run it on your machine and in CI to prevent those bugs ever reaching your customers in production.

## Contributed
This is a small skeleton repository that allows you to have an app managed and powered by a container. 
This allows you to reproduce production behavior and environment.
This project can still be improved and even corrected. 
Feel free to create issues and PRs; 
they will be analyzed and merged if relevant to the project.
