# laravel-sail-skeleton

## Generate certificates
```bash
mkcert -cert-file certs/laravel-sail-skeleton.test.cert \
       -key-file certs/laravel-sail-skeleton.test.key \
       app.laravel-sail-skeleton.test traefik.laravel-sail-skeleton.test "*.laravel-sail-skeleton.test" 127.0.0.1
```
