import pyrebase
import json
from server.settings import BASE_DIR
config={}
with open(f'{BASE_DIR}/firebaseutil/config.json') as f:
    config = json.load(f)
with open(f'{BASE_DIR}/firebaseutil/serviceConfig.json') as f:
    config['serviceAccount'] = f'{BASE_DIR}/firebaseutil/serviceConfig.json'
_firebase = pyrebase.initialize_app(config)
auth = _firebase.auth()
db = _firebase.database()
