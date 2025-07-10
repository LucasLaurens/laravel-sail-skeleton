# laravel-sail-skeleton
_This project corresponds to a small “skeleton” in order to have a key application representing an environment very close to production.
The project is based on the Laravel framework and its Docker management package, Sail.
There are a few small steps to follow during installation, however, to get our application up and running._

## Installation
// Add some explanation...

## Environment
// Add some explanation...

## Certificate
// Add some explanation...

```bash
mkcert -cert-file certs/${APP_SERVICE}.cert \
       -key-file certs/${APP_SERVICE}.test.key \
       app.${APP_SERVICE} traefik.${APP_SERVICE} "*.${APP_SERVICE}" 127.0.0.1
```
