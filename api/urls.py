from django.conf.urls import url
from . import views

__author__ = 'ksx'

urlpatterns = [
    url(r'^getUserMsg$', views.get_user_msg),
    url(r'^getBlackres$', views.get_blackres)
]
