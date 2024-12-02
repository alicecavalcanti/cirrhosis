import requests
import re
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Paciente
from .serializers import PacienteSerializer

class CadastroPacienteView(APIView):
    def post(self, request):
        data = request.data
        
        # Validação do CPF (apenas números e 11 caracteres)
        cpf = data.get('cpf')
        if not cpf or not re.match(r'^\d{11}$', cpf):
            return Response({"error": "CPF inválido, deve ter 11 dígitos."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validação do número de contato (deve ter DD, o código de área e 9 dígitos após isso)
        numero_contato = data.get('numero_contato')
        if not numero_contato or not re.match(r'^\d{2}\d{9}$', numero_contato):  # Exemplo de formato: DDD9XXXXXXXX
            return Response({"error": "Número de contato inválido, deve ter o formato DDD9XXXXXXXX."}, status=status.HTTP_400_BAD_REQUEST)

        cep = data.get('cep')

        # Consultando o ViaCEP para obter os dados do endereço
        try:
            response = requests.get(f'https://viacep.com.br/ws/{cep}/json/')
            response.raise_for_status()  # Verifica erros HTTP
            endereco = response.json()

            if 'erro' in endereco:
                return Response({"error": "CEP inválido."}, status=status.HTTP_400_BAD_REQUEST)

        except requests.exceptions.RequestException as e:
            return Response({"error": f"Erro ao consultar o ViaCEP: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Criar um novo paciente com os dados fornecidos
        try:
            paciente = Paciente.objects.create(
                nome=data['nome'],
                cpf=cpf,
                numero_contato=numero_contato,
                cep=cep,
                rua=endereco.get('logradouro', ''),
                cidade=endereco.get('localidade', ''),
                estado=endereco.get('uf', '')
            )

            serializer = PacienteSerializer(paciente)
            return Response(
                {"content": serializer.data}, 
                status=status.HTTP_201_CREATED)
        except Exception as e:
            # Captura erros ao salvar no banco
            return Response({"error": f"Erro ao criar paciente: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
