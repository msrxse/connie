import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import item_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(CORSMiddleware, allow_origins=origins)


@app.get("/")
def read_root():
    return {"Hello": "World"}


# Register routes

app.include_router(item_router, prefix="/api", tags=["items"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
