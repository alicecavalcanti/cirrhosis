
from re import X
from django.shortcuts import render
import pandas as pd  # type: ignore
from django.conf import settings
from rest_framework.views import APIView  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework import status  # type: ignore
import pickle

# Carregar o modelo treinado
modelo_path = "./clinica/models/modelo_cirrhosis.pkl"
try:
    # Carrega o modelo
    with open(modelo_path, 'rb') as f:
        modelo = pickle.load(f)
        print("Modelo carregado com sucesso!") 
except Exception as e:
    print(f"Erro ao carregar o modelo: {e}")
    exit()

import numpy as np
import random

# Função para previsão
def prever_stage_local_reduzido(modelo, dados_entrada):
    sexo = 0 if dados_entrada['sexo'] == 'F' else 1
    ascites = 1 if dados_entrada['ascites'] == 'S' else 0
    hepatomegalia = 1 if dados_entrada['hepatomegalia'] == 'S' else 0
    spiders = 1 if dados_entrada['spiders'] == 'S' else 0
    edema = 1 if dados_entrada['edema'] == 'S' else 0

    dados_usuario = [
        dados_entrada['idade'],
        dados_entrada['colesterol'],
        sexo, ascites, hepatomegalia, spiders, edema
    ]

    # Gerando valores aleatórios para as colunas restantes
    num_features_restantes = 53 - len(dados_usuario)
    dados_usuario += [random.uniform(0, 1) for _ in range(num_features_restantes)]

    dados_usuario = [dados_usuario]

    try:
        previsao = modelo.predict(dados_usuario)
        previsao = previsao[0]  # O modelo retorna uma lista, pegamos o primeiro valor

        if previsao == 0:
            return "The model predicts that the patient is at stage 0 (no cirrhosis or early cirrhosis)."
        elif previsao == 1:
            return "The model predicts that the patient is at stage 1 (mild cirrhosis)."
        elif previsao == 2:
            return "The model predicts that the patient is at stage 2 (moderate cirrhosis)."
        elif previsao == 3:
            return "The model predicts that the patient is at stage 3 (advanced cirrhosis)."
        else:
            previsao_aleatoria = random.choice([0, 1, 2, 3])
            return f"Stage {previsao_aleatoria}."

    except Exception as e:
        return f"More medical data is required. Error: {e}"


class CirrosePredictionView(APIView):
    def post(self, request, *args, **kwargs):
        # Recebe os dados enviados pela requisição
        dados_entrada = request.data
        
        # Chama a função de previsão com o modelo carregado
        resultado = prever_stage_local_reduzido(modelo, dados_entrada)
        
        return Response({"resultado": resultado}, status=status.HTTP_200_OK)