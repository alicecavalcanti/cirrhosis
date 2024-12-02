from django.db import models

class Paciente(models.Model):
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11, unique=True)
    id_paciente = models.AutoField(primary_key=True)
    numero_contato = models.CharField(max_length=15)
    cep = models.CharField(max_length=8)
    rua = models.CharField(max_length=255)
    cidade = models.CharField(max_length=255)
    estado = models.CharField(max_length=2)

    def __str__(self):
        return self.nome

