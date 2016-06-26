from django.conf import settings
import requests
import json

__author__ = 'ksx'


def search(index, query, es_url=settings.ES_URL):
    url = es_url + '/' + index + '/_search'
    # print(url)
    # print(json.dumps(query))
    return requests.post(url, json.dumps(query)).json()
