import datetime
import re 

def validateUsername(username):
    if not username:
        return False
    lengthValid = 3 <= len(username) <= 40
    return lengthValid

def validatePassword(password):
    if not password:
        return False
    lengthValid = 8 <= len(password) <= 30
    return lengthValid

def validateEmail(email):
    if not email:
        return False
    # format validation
    regex = re.compile(r'^[\w\.]+@([\w]+\.)+[\w]{2,3}$')
    formatValid = regex.match(email)
    lengthValid = 10 <= len(email) <= 50

    # return logic AND of validations.
    return bool(formatValid) and lengthValid

def validateTipo(tipo):
    valores_posibles = ['Ingreso', 'Egreso']
    return tipo in valores_posibles

def validateCategoria(categoria):
    valores_posibles = ['Alimentacion', 
                        'Vivienda', 
                        'Salud', 
                        'Transporte', 
                        'Sueldo', 
                        'Entretencion', 
                        'Educacion', 
                        'Ropa y accesorios', 
                        'Tecnologia', 
                        'Viajes', 
                        'Seguros', 
                        'Deudas', 
                        'Donaciones', 
                        'Mascotas', 
                        'Impuestos', 
                        'Cuidado personal', 
                        'Regalos',
                        'Ahorros',  
                        'Otro']
    return categoria in valores_posibles

def validateCantidad(cantidad):
    if not cantidad:
        return False
    regex = re.compile(r'^\d{1,20}$')
    format_valid = regex.match(cantidad)
    return bool(format_valid)

def validateFecha(fecha):
    if not fecha:
        return False
    fecha_hoy = datetime.date.today()
    fecha_introducida = datetime.datetime.strptime(fecha, '%Y-%m-%d').date()
    es_valida = fecha_introducida <= fecha_hoy
    return es_valida

def validateComentario(comentario):
    if not comentario:
        return True
    length_valid = len(comentario) <= 200
    return length_valid
