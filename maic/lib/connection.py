import requests
import json

def fetch(url, req):
    try:
        if req['method'] == 'GET':
            response = requests.get(url, headers=req['headers'])
        elif req['method'] == 'POST':
            response = requests.post(url, data=json.dumps(req['body']), headers=req['headers'])
        else:
            raise ValueError("Unsupported HTTP method")

        response.raise_for_status()
        response_data = json.loads(response.text)
        
        return response_data
    except requests.exceptions.RequestException as e:
        print("Error: {}".format(e))
        return None


