from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required, user_passes_test
from django.views.decorators.csrf import csrf_protect
from .forms import RegisterForm, LoginForm
from django.db.models import Sum
from HomePage.utils.validations import validateUsername, validatePassword, validateEmail, validateTipo, validateCategoria, validateCantidad, validateComentario, validateFecha
from .models import Transaction
from .forms import NewTransactionForm
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
import operator
import json

# Get saldo of the user
def getSaldo(userid):
    ingresos = Transaction.objects.filter(author_id=userid ,transaction_type='Ingreso').aggregate(Sum('amount'))['amount__sum']
    egresos = Transaction.objects.filter(author_id=userid ,transaction_type='Egreso').aggregate(Sum('amount'))['amount__sum']
    if ingresos is None:
        ingresos = 0
    if egresos is None:
        egresos = 0
    saldo = ingresos - egresos
    if saldo<0:
        saldo = "-${:,.0f}".format(abs(saldo)).replace(",", ".")
    else:
        saldo = "${:,.0f}".format(saldo).replace(",", ".")
    return saldo



# Representa la vista de la pagina de inicio
def home(request):
    if request.user.is_authenticated: # Si el usuario esta logueado
        transacciones_contexto = Transaction.objects.raw('''SELECT * FROM HomePage_transaction
          WHERE author_id = %s 
          ORDER BY date DESC, id DESC 
          LIMIT 5''', [request.user.id])

        #Entrega el saldo total del usuario obteniendo la suma de todos los ingresos y egresos
        context = {
            'title' : 'Home',
            #Se toma en cuenta la excepcion de que no existan transacciones de un tipo o ambos
            'saldo' : getSaldo(request.user.id), #Se obtiene el saldo del usuario   
            'transactions': transacciones_contexto,
            }
        for transaction in context['transactions']:
            transaction.amount = "{:,.0f}".format(transaction.amount).replace(",", ".")

        return render(request, 'HomePage/homePage.html', context)
    return redirect('login')



# Se encarga de loguear al usuario
@csrf_protect
@user_passes_test(lambda user: not user.is_authenticated, login_url='/')
def login_view(request):
    if request.method == 'POST':
        loginform = LoginForm(request.POST)
        if loginform.is_valid():
            user = authenticate(request, username=loginform.cleaned_data['user'], password=loginform.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('HomePage')
            else:
                # mostrar mensaje de error y luego renderizar template con este
                error = 'Usuario y/o contraseña incorrecto'
    else:
        loginform = LoginForm()
        error = None
    return render(request, 'registration/login.html', {'loginform': loginform, 'error': error})


#Se encarga de registrar un nuevo usuario
@csrf_protect
@user_passes_test(lambda user: not user.is_authenticated, login_url='/')
def register_view(request):
    if request.method == 'POST':
        registerform = RegisterForm(request.POST)
        # Validaciones propias
        errores=[]
        username1=registerform.data['user']
        email1=registerform.data['email']
        password1=registerform.data['password']
        repeatPassword1 = registerform.data['repeatPassword']
        if User.objects.filter(username=username1).exists():
            errores.append("El nombre de usuario ya está en uso")
        if User.objects.filter(email=email1).exists():
            errores.append("El correo electrónico ya está en uso")
        if not validateUsername(username1):
            errores.append("Seleccione un usuario con un largo entre 3 y 40 caracteres")
        if not validateEmail(email1):
            errores.append("Ingrese un email válido")
        if not validatePassword(password1):
            errores.append("Ingrese una contraseña de largo entre 8 y 30 caracteres")
        if password1 != repeatPassword1:
            errores.append("Las contraseñas no coinciden") 

        # Si no hay errores en validaciones de django
        if registerform.is_valid():
            username=registerform.cleaned_data['user']
            email=registerform.cleaned_data['email']
            password=registerform.cleaned_data['password']
            # Si no hay errores en validaciones propias
            if not errores:
                # Se inicializa el usuario con los datos ingresados
                user = User.objects.create_user(
                    username,
                    email,
                    password
                )
                user.save()
                # Agregar al usuario al grupo de "Usuarios de transacciones"
                try:
                    group = Group.objects.get(name='Usuarios de transacciones')
                except ObjectDoesNotExist: # Si el grupo no existe, se crea
                    group = Group.objects.get_or_create(name='Usuarios de transacciones')
                    group = Group.objects.get(name='Usuarios de transacciones')
                user.groups.add(group)

                # Se redirige al usuario a página de login
                return redirect('login')
    else:
        registerform = RegisterForm()
        errores=[]
    return render(request, 'registration/registration.html', {'registerform': registerform, 'errores': errores})


@login_required(login_url='/login/')
def transaction(request):

    tipo_filtro = request.GET.get('tipo_filtro')
    categoria_filtro = request.GET.get('categoria_filtro')
    delete_ids = request.GET.get('delete_ids', None)
    fecha_inicio = request.GET.get('fecha_inicio')
    fecha_fin = request.GET.get('fecha_fin')
    orden = request.GET.get('orden')

    fecha_inicio_obj = None
    fecha_fin_obj = None
    if fecha_inicio:
        fecha_inicio_obj = datetime.strptime(fecha_inicio, '%Y-%m-%d').date()
    if fecha_fin:
        fecha_fin_obj = datetime.strptime(fecha_fin, '%Y-%m-%d').date()

    transactions = Transaction.objects.filter(author_id=request.user.id)
    transactions = transactions.order_by('-date', '-id')

    if tipo_filtro:
        transactions = transactions.filter(transaction_type=tipo_filtro)
    if categoria_filtro:
        transactions = transactions.filter(category=categoria_filtro)

    if orden == 'fecha_asc':
        transactions = transactions.order_by('date', 'id')
    elif orden == 'fecha_desc':
        transactions = transactions.order_by('-date', '-id')


    filtro_fechas_aplicado = False
    if fecha_inicio_obj and fecha_fin_obj:

        transactions = transactions.filter(date__range=(fecha_inicio_obj, fecha_fin_obj))
        filtro_fechas_aplicado = True

    delete_ids = request.GET.get('delete_ids')
    if delete_ids:
        delete_ids = json.loads(delete_ids)
        transactions_to_delete = Transaction.objects.filter(id__in=delete_ids)
        transactions_to_delete.delete()


    for transaction in transactions:
        transaction.amount = "{:,.0f}".format(transaction.amount).replace(",", ".")

    context = {
        'transactions': transactions,
        'title': 'Transactions',
        'tipo_filtro': tipo_filtro,
        'categoria_filtro': categoria_filtro,
        'fecha_inicio': fecha_inicio,
        'fecha_fin': fecha_fin,
        'filtro_fechas_aplicado': filtro_fechas_aplicado,
        'orden': orden,
    }

    return render(request, 'Transactions/transaction.html', context)




#Se encarga de añadir una transaccion mediante un formulario
@csrf_protect
@login_required(login_url='/login/')
def addTransaction(request):
    # Se crea lista de errores
    errores=[]
    # Se utiliza el formulario de añadir transaccion
    if request.method == 'POST': 
        form = NewTransactionForm(request.POST) 
        tipo=form.data['transaction_type']
        categoria=form.data['category']
        cantidad=form.data['amount']
        fecha = form.data['date']
        comentario=form.data['comment']
        # Comienzo de validaciones
        if not validateTipo(tipo):
            errores.append("Seleccione un tipo entre las opciones.")
        if not validateCategoria(categoria):
            errores.append("Seleccione una categoría entre las opciones.")
        if not validateCantidad(cantidad):
            errores.append("Ingrese una cantidad válida (positiva y con máximo 20 dígitos).")
        if not validateFecha(fecha):
            errores.append("Ingrese una fecha anterior o igual al día actual.") 
        if not validateComentario(comentario):
            errores.append("El comentario debe tener como máximo 200 caracteres.") 
        # Si todas las validaciones son correctas
        if not errores and form.is_valid():
            if request.POST.get('modi'): 
                if form.is_valid():
                    new_transaction = form.save(commit=False)
                    new_transaction.author_id = request.user.id
                    new_transaction.save()
                    return redirect('Transacciones del Usuario')
        else: # Si hay errores, entonces retornar los errores para que luego sean usados en el html
            return render(request, 'Transactions/add_transaction.html', {'form': form, 'errores': errores})
    else:
        form = NewTransactionForm()
    return render(request, 'Transactions/add_transaction.html', {'form': form, 'errores': errores})

# Se obtiene la transaccion a modificar y se le pasa al formulario para que lo modifique o elimine
@csrf_protect
@login_required(login_url='/login/')
def modificarTransaction(request, transaction_id):
    # Se verifica que la transacción pasada como parámetro exista; en caso de no hacerlo, se redirige al usuario
    transaction_ids = Transaction.objects.values_list('id', flat=True)
    if(transaction_id not in transaction_ids):
        return redirect('HomePage')
    # Se obtiene la transaccion a modificar
    transaction = Transaction.objects.get(id=transaction_id)
    if transaction.author_id == request.user.id: # Se ve si el usuario que quiere modificar la transaccion es el mismo que la creo
        # Se cambia el formato de la fecha para que se pueda mostrar en el formulario
        transaction.date = transaction.date.strftime('%Y-%m-%d') 
        # Se crea lista de errores
        errores=[]
        # Se utiliza el formulario de añadir transaccion pero con los datos de la transaccion a modificar
        # Además se ven los casos modificar y eliminar, y se validan las entradas
        if request.method == 'POST': 
            form = NewTransactionForm(request.POST, instance=transaction) #Se le pasa la instancia de la transaccion a modificar
            tipo=form.data['transaction_type']
            categoria=form.data['category']
            cantidad=form.data['amount']
            fecha = form.data['date']
            comentario=form.data['comment']
            # Comienzo de validaciones
            if not validateTipo(tipo):
                errores.append("Seleccione un tipo entre las opciones.")
            if not validateCategoria(categoria):
                errores.append("Seleccione una categoría entre las opciones.")
            if not validateCantidad(cantidad):
                errores.append("Ingrese una cantidad válida (positiva y con máximo 20 dígitos).")
            if not validateFecha(fecha):
                errores.append("Ingrese una fecha anterior o igual al día actual.") 
            if not validateComentario(comentario):
                errores.append("El comentario debe tener como máximo 200 caracteres.") 
            # Si todas las validaciones son correctas
            if not errores and form.is_valid():
                # Se ve si se quiere modificar o eliminar
                if request.POST.get('modi'):  # Si se quiere modificar
                    if form.is_valid():
                        new_transaction = form.save(commit=False)
                        new_transaction.author_id = request.user.id
                        new_transaction.save()
                        return redirect('Transacciones del Usuario')
            if request.POST.get('del'): #Si se quiere eliminar
                transaction.delete()
                return redirect('Transacciones del Usuario')
            else: # Si hay errores, entonces retornar los errores para que luego sean usados en el html
                return render(request, 'Transactions/modificar_transaction.html', {'form': form, 'errores': errores})
        else:
            form = NewTransactionForm(instance=transaction)
        return render(request, 'Transactions/modificar_transaction.html', {'form': form, 'errores': errores})
    else:
        #Se envia al home
        return redirect('HomePage')