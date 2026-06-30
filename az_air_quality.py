#!/usr/bin/env python3
"""Arizona Air Quality — pulls live AQI data from the AirNow (EPA) API.

Get a free API key at: https://docs.airnowapi.org/account/request/
Then run:  python3 az_air_quality.py YOUR_API_KEY
"""

import sys
import urllib.request
import urllib.parse
import json
from datetime import datetime, timezone

CITIES = [
    ("Phoenix",   "85001"),
    ("Tucson",    "85701"),
    ("Flagstaff", "86001"),
    ("Yuma",      "85364"),
    ("Mesa",      "85201"),
]

BASE = "https://www.airnowapi.org/aq/observation/zipCode/current/"

AQI_LEVELS = [
    (0,   50,  "Good",                   "✅"),
    (51,  100, "Moderate",               "🟡"),
    (101, 150, "Unhealthy for Sensitive","🟠"),
    (151, 200, "Unhealthy",              "🔴"),
    (201, 300, "Very Unhealthy",         "🟣"),
    (301, 500, "Hazardous",              "⚫"),
]

def classify(aqi):
    for lo, hi, label, icon in AQI_LEVELS:
        if lo <= aqi <= hi:
            return label, icon
    return "Unknown", "❓"

def fetch_aqi(zip_code, api_key):
    params = urllib.parse.urlencode({
        "format":   "application/json",
        "zipCode":  zip_code,
        "distance": 25,
        "API_KEY":  api_key,
    })
    url = f"{BASE}?{params}"
    with urllib.request.urlopen(url, timeout=10) as r:
        return json.loads(r.read())

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        print("Usage: python3 az_air_quality.py <API_KEY>")
        sys.exit(1)

    api_key = sys.argv[1]
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    print(f"\n🌵 Arizona Air Quality  ({now})\n" + "─" * 52)

    for city, zip_code in CITIES:
        try:
            readings = fetch_aqi(zip_code, api_key)
            if not readings:
                print(f"  {city:<12}  — no current data")
                continue
            # pick the worst AQI across all pollutants reported
            worst = max(readings, key=lambda r: r["AQI"])
            aqi      = worst["AQI"]
            pollutant = worst["ParameterName"]
            label, icon = classify(aqi)
            print(f"  {city:<12}  AQI {aqi:>3}  ({pollutant:<6})  {icon}  {label}")
        except Exception as e:
            print(f"  {city:<12}  — error: {e}")

    print()

if __name__ == "__main__":
    main()
