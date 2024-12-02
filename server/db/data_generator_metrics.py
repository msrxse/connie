import json
import random

import factory
from faker import Faker

fake = Faker()


# Define factories
class PerformanceFactory(factory.Factory):
    class Meta:
        model = dict

    on_time_delivery = factory.LazyAttribute(lambda _: random.randint(60, 100))
    quality_rating = factory.LazyAttribute(lambda _: round(random.uniform(2.5, 5.0), 1))
    price_rating = factory.LazyAttribute(lambda _: round(random.uniform(2.5, 5.0), 1))


class CapacityFactory(factory.Factory):
    class Meta:
        model = dict

    current = factory.LazyAttribute(lambda _: random.randint(30, 80))
    max = factory.LazyAttribute(lambda _: random.randint(70, 100))


class EvidenceTraceFactory(factory.Factory):
    class Meta:
        model = dict

    evidence_id = factory.Sequence(lambda n: n + 1)
    description = factory.LazyAttribute(lambda _: fake.sentence())
    excerpt = factory.LazyAttribute(
        lambda _: (
            f"<div>\n"
            f"    {fake.sentence()}. <span>{fake.sentence()}</span> {fake.sentence()} "
            f"{fake.sentence()}. {fake.sentence()}.\n"
            f"    <div>\n"
            f"    </div>\n"
            f"    {fake.sentence()}. <span>{fake.sentence()}</span> {fake.sentence()}.\n"
            f"</div>"
        )
    )
    source = factory.LazyAttribute(lambda _: fake.url())


class PotentialActionsFactory(factory.Factory):
    class Meta:
        model = dict

    action_id = factory.Sequence(lambda n: n + 1)
    description = factory.LazyAttribute(lambda _: fake.sentence())


class AlternativeSupplierFactory(factory.Factory):
    class Meta:
        model = dict

    id = factory.Sequence(lambda n: n + 1)
    name = factory.LazyAttribute(lambda _: fake.company())
    online_source = factory.LazyAttribute(lambda _: fake.url())
    estimated_performance = factory.SubFactory(PerformanceFactory)
    contact_info = factory.LazyAttribute(
        lambda _: {"email": fake.company_email(), "phone": fake.phone_number()}
    )


class PerformanceMetricsFactory(factory.Factory):
    class Meta:
        model = dict

    delivery = factory.LazyAttribute(
        lambda _: {
            "on_time_percentage": random.uniform(85, 100),
            "average_delivery_delay_days": round(random.uniform(0, 5), 1),
        }
    )
    quality = factory.LazyAttribute(
        lambda _: {
            "defective_rate_percentage": round(random.uniform(0, 5), 1),
            "product_compliance_rate_percentage": round(random.uniform(95, 100), 1),
        }
    )
    responsiveness = factory.LazyAttribute(
        lambda _: {
            "average_response_time_hours": round(random.uniform(1, 48), 1),
            "resolution_rate_percentage": round(random.uniform(80, 100), 1),
        }
    )
    financial = factory.LazyAttribute(
        lambda _: {
            "cost_variance_percentage": round(random.uniform(-10, 10), 1),
            "invoicing_accuracy_percentage": round(random.uniform(95, 100), 1),
        }
    )


class SupplierFactory(factory.Factory):
    class Meta:
        model = dict

    delivery_id = factory.Sequence(lambda n: n + 1)
    performance = factory.SubFactory(PerformanceFactory)
    contract_end_date = factory.LazyAttribute(
        lambda _: fake.date_between(start_date="now", end_date="+2y").isoformat()
    )
    capacity = factory.SubFactory(CapacityFactory)
    evidence_trace = factory.List(
        [factory.SubFactory(EvidenceTraceFactory) for _ in range(3)]
    )
    potential_actions = factory.List(
        [factory.SubFactory(PotentialActionsFactory) for _ in range(3)]
    )
    alternative_suppliers = factory.List(
        [factory.SubFactory(AlternativeSupplierFactory) for _ in range(1)]
    )


# Define the Factory for Supplier data
class KeyMetricsFactory(factory.Factory):
    class Meta:
        model = dict  # Generate dictionaries

    delivery_id = factory.Sequence(lambda n: n + 1)
    performance_metrics = factory.SubFactory(PerformanceMetricsFactory)
    overall_rating = factory.LazyAttribute(lambda _: round(random.uniform(3, 5), 1))
    comments = factory.LazyAttribute(lambda _: fake.sentence(nb_words=10))


# Generate sample data
def generate_key_metric_and_performance_data(n=103, output_file="key_metrics.json"):
    trace_actions = SupplierFactory.create_batch(n)
    key_metrics = KeyMetricsFactory.create_batch(n)

    with open("trace_actions.json", "w") as f:
        json.dump(trace_actions, f, indent=2)

    with open("key_metrics.json", "w") as f:
        json.dump(key_metrics, f, indent=2)

    print("Data has been saved to 'deliveries.json' and 'items.json'.")


# Generate a JSON file with 103 key_metrics
generate_key_metric_and_performance_data()
