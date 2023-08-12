from django import forms
from .models import Transaction
from django.core.exceptions import ValidationError
from django.utils import timezone


class RegisterForm(forms.Form):
    user = forms.CharField(label="Usuario", required = True, widget=forms.TextInput(attrs={'class': 'form-control inputs', 'placeholder': 'Usuario', 'id': 'usuario'}))
    email = forms.EmailField(label="Correo electrónico", required = True, widget=forms.TextInput(attrs={'class': 'form-control inputs', 'placeholder': 'Correo electrónico', 'id': 'email'}))
    password = forms.CharField(label="Contraseña", widget=forms.PasswordInput(attrs={'class': 'form-control inputs', 'placeholder': 'Contraseña', 'id': 'contrasenna'}),required = True)
    repeatPassword  = forms.CharField(label="Repetir contraseña", widget=forms.PasswordInput(attrs={'class': 'form-control inputs', 'placeholder': 'Repetir contraseña', 'id': 'repetir_contrasenna'}),required = True)

class LoginForm(forms.Form):
    user = forms.CharField(label="Usuario", required = True, widget=forms.TextInput(attrs={'class': 'form-control inputs', 'placeholder': 'Usuario', 'id': 'usuario'}))
    password = forms.CharField(label="Contraseña", widget=forms.PasswordInput(attrs={'class': 'form-control inputs', 'placeholder': 'Contraseña', 'id': 'contrasenna'}), required = True)



class NewTransactionForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = ('transaction_type', 'category', 'amount', 'date', 'comment')
        widgets = {
            'transaction_type': forms.Select(attrs={'class': 'form-select', 'id':'type'}),
            'category': forms.Select(attrs={'class': 'form-select', 'id':'category'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control', 'id':'amount', 'placeholder':'Ej: 12345678'}),
            'date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date', 'format': '%Y-%m-%d', 'id':'date'}),
            'comment': forms.TextInput(attrs={'class': 'form-control', 'id':'comment', 'placeholder':'Ej: Transferencia a ...'})
        } 

    # Validar que el monto sea mayor a 0    
    def clean_amount(self):
        amount = self.cleaned_data['amount']
        if amount < 0:
            raise ValidationError("Amount debe ser mayor a 0.")
        return amount
    
    # Validar que la fecha no sea mayor a la actual
    def clean_date(self):
        date = self.cleaned_data['date']
        
        #print(timezone.localtime()) why this works? idk asdkfkm
        
        if date > timezone.localtime().date():
            raise ValidationError("La fecha no puede ser mayor a la actual.")
        return date
    
    