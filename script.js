// -------------- CONECCIÓN A LA BASE DE DATOS DE FIREBASE -------------

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCzn9J1UtyQMs-Re9TMmYt3YBPOmKH-ja0",
    authDomain: "datos-de-formulario-5e6fe.firebaseapp.com",
    projectId: "datos-de-formulario-5e6fe",
    storageBucket: "datos-de-formulario-5e6fe.appspot.com",
    messagingSenderId: "989349659116",
    appId: "1:989349659116:web:1b192ecce8b0ff63ffc0c9",
    measurementId: "G-4P1N8RB5H6"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
// -------------- CONECCIÓN A LA BASE DE DATOS DE FIREBASE -------------

document.getElementById('formulario').addEventListener('submit', (event) => {
    // Con esta accion evitamos que al hacer click en "enviar"(submit) se limpie el formulario. Por defecto HTML lo limpia.
    event.preventDefault()

    // Validar campo nombnre.
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    // Con trim eliminamos si hay espacios a los costados.
    if (entradaNombre.value.trim() == '') {
        // Si no se ingreso nada en el nombre, aparecerá este mensaje.
        errorNombre.textContent = 'Por favor, introduzca su nombre.'
        // Le damos al mensaje el "diseño" que definimos en la clase "error-message" ubicada en style.css.
        errorNombre.classList.add('error-message')
    } else {
        // Si los datos son correctos, borramos el error en caso de que anteriormente haya habido error.
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    // Validar correo electrónico.
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    // Patron que se usa para verificar correos electrónicos:
    let emailPattern = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    // Corroboramos que el email recibido concuerda con el aptron de los correos electrónicos.
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducí un email válido.'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    // Validar la contraseña.
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas, y caracteres especiales.'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    // Si todos los campos son válidos, enviar formulario.
    // Si todos tienen guardado ''(vacio), es porque se ingresaron los campos de manera correcta. El que esten vacio devolveria FALSE, por eso hay que negarlos.
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        // BACKEND QUE RECIBA LA INFORMACIÓN.
        // Enviamos datos a la base de datos de FireBase
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            // De esta manera se despliega un cartel.
            alert('¡El formulario se ha enviado con éxito!', docRef.id);
            // Limpiamos todo el formulario.
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });

    }

})