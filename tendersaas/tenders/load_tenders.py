import json
from .models import Tender

# Load JSON file
with open('data/sample_tenders.json', 'r') as file:
    tenders = json.load(file)

# Insert data into database
for tender in tenders:
    Tender.objects.create(
        title=tender['title'],
        sector=tender['sector'],
        tender_type=tender['tender_type'],
        location=tender['location'],
        published_by=tender['published_by'],
        description=tender['description'],
        tender_value=tender['tender_value'],
        deadline=tender['deadline'],
        status=tender['status']
    )

print("✅ Dummy tender data imported successfully!")
