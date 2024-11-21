from json import loads

import duckdb
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:4000",
]
app.add_middleware(CORSMiddleware, allow_origins=origins)


# Connect to an in-memory DuckDB database
con = duckdb.connect()

# Register the JSON files as tables
con.execute(
    "CREATE VIEW deliveries AS SELECT * FROM read_json_auto('db/deliveries.json');"
)
con.execute("CREATE VIEW items AS SELECT * FROM read_json_auto('db/items.json');")


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/getAllItems")
async def get_all_items():
    # Example Query: Get all items from deliveries
    query = """
    SELECT
        i.item_id,
        d.delivery_id,
        d.delivery_date,
        d.supplier,
        i.material_number,
        i.description,
        i.quantity
    FROM
        deliveries d
    JOIN
        items i
    ON
        d.delivery_id = i.delivery_id
    """
    result = con.execute(query).df()
    result = result.to_json(orient="records")
    parsed = loads(result)
    # dumps(parsed, indent=4)

    return parsed


@app.get("/api/material_types")
async def get_material_types():
    # Example Query: Get all items from deliveries
    query = """
    SELECT
    DISTINCT 
        material_type
    FROM
        items
    """
    result = con.execute(query).df()

    # Extract the 'material_type' column as a list of strings
    material_types = result["material_type"].tolist()

    # Format each item as an object with 'value' and 'label'
    formatted_types = [{"value": mt, "label": mt.capitalize()} for mt in material_types]

    return formatted_types


@app.get("/api/itemsByType")
async def get_items_by_type(material_type: str):
    query = """
    SELECT 
        d.delivery_id,
        d.delivery_date,
        d.supplier,
        i.item_id,
        i.country_of_origin,
        i.total_amount,
        i.expiration_date,
        i.quantity,
        i.material_type
    FROM
        deliveries d
    JOIN
        items i
    ON
        d.delivery_id = i.delivery_id
    WHERE 
        i.material_type = ?;
    """
    try:
        # Execute the parameterized query
        result = con.execute(query, (material_type,)).df()
        result = result.to_json(orient="records")
        parsed = loads(result)

        return parsed

    except Exception as e:
        # Log the error (or handle it as needed)
        print(f"Error fetching items by type: {e}")
        return []
