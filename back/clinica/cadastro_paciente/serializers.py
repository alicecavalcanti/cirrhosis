from rest_framework import serializers
from .models import Paciente

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = ['id_paciente', 'nome', 'cpf', 'numero_contato', 'cep', 'rua', 'cidade', 'estado']
