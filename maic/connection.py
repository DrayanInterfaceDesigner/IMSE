import requests
import json

def fetch(addr):
    try:
        response = requests.get(addr)
        response.raise_for_status()
        data = json.loads(response.text)
        return data
    except requests.exceptions.RequestException as e:
        print("Error: {}".format(e))
        return None