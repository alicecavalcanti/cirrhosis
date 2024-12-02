from django.urls import path
from .views import CadastroPacienteView

urlpatterns = [
     path('', CadastroPacienteView.as_view(), name='cadastro-paciente'),
]