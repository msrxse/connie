import duckdb

# Connect to an in-memory DuckDB database
con = duckdb.connect()

# Register the JSON files as tables
con.execute(
    "CREATE VIEW deliveries AS SELECT * FROM read_json_auto('db/deliveries.json');"
)
con.execute("CREATE VIEW items AS SELECT * FROM read_json_auto('db/items.json');")
con.execute(
    "CREATE VIEW key_metrics AS SELECT * FROM read_json_auto('db/key_metrics.json');"
)
con.execute(
    "CREATE VIEW trace_actions AS SELECT * FROM read_json_auto('db/trace_actions.json');"
)
