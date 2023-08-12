# Información de desarrollo relevante
En la rama main de este proyecto se presenta todo lo realizado de manera conjunta por parte del grupo 8 en el curso "Ingeniería de Software", en el semestre de otoño de 2023. La descripción del grupo y el curso es la siguiente:
## Grupo 8 - Los Spaghetis
### Integrantes: 
- Benjamín San Martin V
- Felipe Olivares 
- Rodrigo Hidalgo 
- Sebastián Monteiro 
- Vicente Lepe    
### Curso: CC4101-1 Ingeniería de Software
### Profesora : Jocelyn Simmonds

Tomando aquello de base, es que todos los commits realizados en la rama actual (Updated_Project) son de autoría propia; realizándose cambios en aspectos de organización en la estructura de la aplicación y aspectos del diseño.

# Detalles necesarios para el funcionamiento
Para el funcionamiento correcto de la aplicación, es posible crear un ambiente virtual en paralelo al repositorio actual, dígase uno con el nombre 'myenv', se puede realizar lo siguiente:
```
python3 -m venv myenv
```
Con el ambiente creado, se tendrá que cumplir los siguientes requerimientos:
## Requerimientos
- Python 3.11.2
- Django==4.2
- asgiref==3.6.0
- sqlparse==0.4.4
- tzdata==2023.3

Con la versión señalada de python, bastaría activar el ambiente virtual al nivel de carpeta correspondiente, es decir, en aquella que contiene a la del repositorio clonado y el ambiente virtual; esto con ``` myenv/bin/activate ```. Realizado lo anterior, instalar los requerimientos en el ambiente, esto de la manera que sigue:
```
pip install -r requirements.txt
```
Teniendo los requerimientos necesarios, se puede correr la aplicación yendo a la carpeta que contiene el archivo "manage.py", en este caso, accediendo a la carpeta "App" desde la terminal y ahí utilizando el comando: 
```
python manage.py runserver
``` 
Predeterminadamente se iniciará la aplicación en el puerto 8000, pero se puede modificar simplemente añadiendo el número de puerto que se quiera luego del "runserver" del código anterior, por ejemplo, si se desea el puerto 8080, se debe introducir ```python manage.py runserver 8080```.

Por último, en la base de datos disponible tan solo existe un usuario de nombre "admin" y contraseña "adminroot", el que tiene control total de la aplicación.

# Explicación del Proyecto
El proyecto abordado consiste en el desarrollo de una aplicación web que funcione como sistema
de manejo financiero. Este nace de la motivación por ayudar a personas a que logren ordenar
sus finanzas, entregándoles una experiencia grata, cómoda y segura. 


## Features
- Registro y login de usuarios.
- Ver el saldo de la cuenta.
- Ver el historial transacciones.
- Formulario para crear transacciones.
- Capacidad de modificar y eliminar transacciones.
- Categorización de las transacciones (Ingreso/Egreso).

# Estructura del proyecto
La aplicación se encuentra en 'App->HomePage'. En dicha carpeta, "static" contiene todos los archivos de diseño de la aplicación; JS, CSS e imágenes. Por otro lado, en "templates" están todos los archivos HTML. Luego, en "utils" se pueden hallar las validaciones del servidor y sus pruebas unitarias, y el resto de archivos .py que están en paralelo a estas carpetas, componen toda la lógica de la aplicación.