# api/urls.py
from django.urls import path
from .views import CirrosePredictionView

urlpatterns = [
    path('predict-cirrhosis/', CirrosePredictionView.as_view(), name='predict_cirrhosis')
]