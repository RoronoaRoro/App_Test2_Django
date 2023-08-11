from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Representa una transaccion de un usuario
class Transaction(models.Model):
    # Tipos de transacciones
    OPCIONES_TRANSACCION=(
        ('Ingreso','Ingreso'),
        ('Egreso','Egreso')
        )
    
    # Categorias de transacciones
    CATEGORIAS=(
        ('Alimentacion','Alimentacion'),
        ('Vivienda','Vivienda'), #Luz agua gas ,etc...
        ('Salud','Salud'),
        ('Transporte','Transporte'),
        ('Sueldo','Sueldo'),
        ('Entretencion','Entretencion'),
        ('Educacion','Educacion'),
        ('Ropa y accesorios','Ropa y accesorios'),
        ('Tecnologia','Tecnologia'),
        ('Viajes','Viajes'),
        ('Seguros','Seguros'),
        ('Deudas','Deudas'),
        ('Donaciones','Donaciones'),
        ('Mascotas','Mascotas'),
        ('Impuestos','Impuestos'),
        ('Cuidado personal','Cuidado personal'),
        ('Regalos','Regalos'),
        ('Ahorros','Ahorros'),
        ('Otro','Otro'))



    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default= timezone.now().strftime("%Y-%m-%d"), blank=True)
    transaction_type = models.CharField(max_length=20,choices=OPCIONES_TRANSACCION, blank=True)
    category = models.CharField(max_length=20,choices=CATEGORIAS, blank=True)
    amount = models.DecimalField(max_digits=20,decimal_places=0, blank=True)
    comment = models.TextField(blank=True)
    
    def __str__(self):
        
        return f"{self.date.strftime('%Y-%m-%d')}_{self.author.username}"