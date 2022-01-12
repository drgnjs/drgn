# drgn

#### What does drgn do?

1. ***caching project files***
2. ***detecting environment, building app***
3. ***pushing code onto server***
4. ***validating system requirements***
5. ***installing dependencies***
6. ***updating environment variables***
7. ***running app***
8. ***setting up failover***

#### Supported Languages:

- [**Node.js**]() `npm`
- [**Python**]() `pip`

## Setup

```sh-session
npm i -g drgn
```

```sh-session
drgn deploy
```

```json
{
  "prepare": "npm run build",
  "memoryLimit": 100,
  "credentials": {
    "host": "127.0.0.1",
    "user": "admin",
    "password": "secret123"
  }
}
```

#### Use a .env

Put your secrets inside `$$`'s

```json
"host": "$$host$$"
```

#### Your .env

```env
host = "127.0.0.1"
```
