# Documents

This is a place where I'm storing schemas like json schemas for my future databases, and how the data will be stored

## Stats

Stats are the basic information about a Yu-Gi-Oh! Card so the jsonb in our table will look something like this:

```json
{
  "atk": 1800,
  "def": 800,
  "level": 4
}
```

## Card Sets

Card sets are brought back from the https://ygoprodeck.com API as part of the response

Example:

```json
[
  {
    "set_name": "Dark Beginning 1",
    "set_code": "DB1-EN143",
    "set_rarity": "Common",
    "set_rarity_code": "(C)",
    "set_price": "1.01"
  },
  {
    "set_name": "Metal Raiders",
    "set_code": "MRD-005",
    "set_rarity": "Common",
    "set_rarity_code": "(C)",
    "set_price": "0.96"
  },
  {
    "set_name": "Metal Raiders",
    "set_code": "MRD-E005",
    "set_rarity": "Common",
    "set_rarity_code": "(C)",
    "set_price": "4.89"
  },
  {
    "set_name": "Metal Raiders",
    "set_code": "MRD-EN005",
    "set_rarity": "Common",
    "set_rarity_code": "(C)",
    "set_price": "2.95"
  },
  {
    "set_name": "Starter Deck: Joey",
    "set_code": "SDJ-009",
    "set_rarity": "Common",
    "set_rarity_code": "(C)",
    "set_price": "0.98"
  }
]
```

How do we want to store this, as jsonb on the cards table, or do we want to try and break this down into its own table?

### Why are there duplicates?

Good question, I'm not entirely sure why there are duplicates yet, it could be because of the set pricing
