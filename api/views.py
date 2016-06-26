import json
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.conf import settings
from utils import es
import time

__author__ = 'ksx'


@login_required
def get_user_msg(request):
    data = es.search(settings.DANMU_INDEX_NAME, {
        "sort": [
            {"@timestamp": "asc" if request.GET.get("sort") == "0" else "desc"}
        ],
        "query": {
            "filtered": {
                "query": {
                    "query_string": {
                        "analyze_wildcard": True,
                        "query": "nn:" + request.GET.get("name")
                    }
                },
                "filter": {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "type": "chatmsg"
                                }
                            }
                            # {
                            #   "range": {
                            #     "@timestamp": {
                            #       "gte": 1464790400000,
                            #       "lte": 1467302399999,
                            #       "format": "epoch_millis"
                            #     }
                            #   }
                            # }
                        ],
                        "must_not": []
                    }
                }
            }
        },
        "size": 10000
    })
    result = [d["_source"] for d in data["hits"]["hits"]]

    return HttpResponse(content=json.dumps(result), content_type='application/json')


@login_required
def get_blackres(request):
    data = es.search(settings.DANMU_INDEX_NAME, {
        "sort": [
            {"@timestamp": "asc" if request.GET.get("sort") == "0" else "desc"}
        ],
        "query": {
            "filtered": {
                "query": {
                    "query_string": {
                        "analyze_wildcard": True,
                        "query": "(dnic:%s) AND (snic:%s)" % (request.GET.get("name", "*"), request.GET.get("operator", '*'))
                    }
                },
                "filter": {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "type": "newblackres"
                                }
                            }
                        ]
                    }
                }
            }
        },
        "size": 10000
    })
    result = [d["_source"] for d in data["hits"]["hits"]]

    for d in result:
        timeStamp = int(d["endtime"])
        timeArray = time.localtime(timeStamp)
        d["endtime"] = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)

    return HttpResponse(content=json.dumps(result), content_type='application/json')
