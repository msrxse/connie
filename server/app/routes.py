from json import loads

from db.db import con
from fastapi import APIRouter

item_router = APIRouter(tags=["User"])


@item_router.get("/getAllItems")
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


@item_router.get("/material_types")
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


@item_router.get("/itemsByType")
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


@item_router.get("/suppliers")
async def get_suppliers():
    query = """
    SELECT DISTINCT
        supplier,
    FROM
        deliveries
    """
    try:
        # Extract the 'material_type' column as a list of strings
        result = con.execute(query).df()
        suppliers = result["supplier"].tolist()

        # Format each item as an object with 'value' and 'label'
        formatted_types = [{"value": mt, "label": mt.capitalize()} for mt in suppliers]

        return formatted_types

    except Exception as e:
        # Log the error (or handle it as needed)
        print(f"Error fetching suppliers: {e}")
        return []


@item_router.get("/key_metric")
async def get_key_metric_by_id(delivery_id: int):
    query = """
    SELECT 
        k.*,
        d.supplier
    FROM
        key_metrics k
    JOIN
        deliveries d
    ON
        k.delivery_id = d.delivery_id
    WHERE 
        k.delivery_id = ?;
    """
    try:
        # Execute the parameterized query
        result = con.execute(query, (delivery_id,)).df()
        result = result.to_json(orient="records")
        parsed = loads(result)

        return parsed

    except Exception as e:
        # Log the error (or handle it as needed)
        print(f"Error fetching key metrics by id: {e}")
        return []


@item_router.get("/trace_actions")
async def get_trace_actions():
    query = """
    SELECT 
        t.*,
        i.total_amount,
        i.expiration_date,
        d.supplier,
    FROM
        trace_actions t
    JOIN
        items i
    ON
        t.delivery_id = i.delivery_id
    JOIN
        deliveries d
    ON
        t.delivery_id = d.delivery_id
    """
    try:
        # Execute the parameterized query
        result = con.execute(query).df()
        result = result.to_json(orient="records")
        parsed = loads(result)

        return parsed

    except Exception as e:
        # Log the error (or handle it as needed)
        print(f"Error fetching trace actions: {e}")
        return []
