# supplier performance monitoring system

## Dev

### Ensure you work under a virtual environment

From root:

```bash
  python3 -m venv .venv
```

```bash
  source .venv/bin/activate
```

### When installing anew

```bash
  pip install -r requirements.txt
```

### When adding packages

```bash
  pip freeze > requirements.txt
```

### Running the server

Run the server with:

```bash
  fastapi dev app/main.py
```
