import json
import random

import factory
from faker import Faker

# Initialize Faker
fake = Faker()


# Define the Factory for Supplier data
class SupplierFactory(factory.Factory):
    class Meta:
        model = dict  # Generate dictionaries

    supplier_id = factory.Sequence(lambda n: n + 1)
    supplier = factory.LazyAttribute(lambda _: fake.company())
    performance_metrics = factory.LazyAttribute(
        lambda _: {
            "delivery": {
                "on_time_percentage": random.uniform(85, 100),
                "average_delivery_delay_days": round(random.uniform(0, 5), 1),
            },
            "quality": {
                "defective_rate_percentage": round(random.uniform(0, 5), 1),
                "product_compliance_rate_percentage": round(random.uniform(95, 100), 1),
            },
            "responsiveness": {
                "average_response_time_hours": round(random.uniform(1, 48), 1),
                "resolution_rate_percentage": round(random.uniform(80, 100), 1),
            },
            "financial": {
                "cost_variance_percentage": round(random.uniform(-10, 10), 1),
                "invoicing_accuracy_percentage": round(random.uniform(95, 100), 1),
            },
        }
    )
    overall_rating = factory.LazyAttribute(lambda _: round(random.uniform(3, 5), 1))
    comments = factory.LazyAttribute(lambda _: fake.sentence(nb_words=10))


# Generate sample data
def generate_supplier_data(n=103, output_file="key_metrics.json"):
    key_metrics = SupplierFactory.create_batch(n)
    with open(output_file, "w") as f:
        json.dump(key_metrics, f, indent=2)


# Generate a JSON file with 103 key_metrics
generate_supplier_data()
