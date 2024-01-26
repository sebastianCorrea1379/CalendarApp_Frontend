import { useEffect, useMemo, useState } from "react";

// La condicion para usar este hook es inicializar el formulario fuera del componente
// Osea se debe mandar el initial form

/*  
    Para asociar un formulario:
    1. Se crea un objeto con los campos del formulario. 
    Ej: {nombre: '', email: ''}
    Nota: Ese objeto que se crea afuera de este hook es el que se envia como initialState
    
    2. Creamos el hook y le enviamos el initial state.
    
    3. Desestructuramos los campos y las funciones. 
    Ej: const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    
    4. En la propiedad name del field se pone el nombre del campo que le pusimos en el objeto del formulario. 
    Ej: <input name= "email" />

    5. Se hace lo mismo en el campo value. 
    Ej: <input value= {email} />

    6. En el onChange del field ponemos nuestra funcion de onInputChange. 
    Ej: <input onChange= {onInputChange} /> 
    Nota: Si hay varios formularios en donde usemos el hook, se deben poner alias a las funciones que usamos como onInputChange. 
    Ej: Cundo desestructuramos se pone : onInputChange:onLoginInputChange 
*/

export const useForm = (initialForm = {}, formValidations = {} ) => {
  
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    // Se ejecuta la función createValidators() cada vez que cambie el formState que son pues los campos del formulario
    useEffect(() => {
        createValidators();
    }, [formState])

    // Este es para que si cambia el initialForm, se establezca ese initialForm como el estado actual del formulario
    useEffect(() => {
      setFormState( initialForm );
    }, [ initialForm ])
    

    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if( formValidation[formValue] !== null ) return false;
        }

        return true;

    }, [formValidation]);
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckedValues = {};

        // esto es un for of es para iterar, el Object.key devuelve el nombre de las claves
        // del objeto, en este caso, displayName, email, password.
        for (const formField of Object.keys( formValidations )) {
            // Aquí desestructuramos la funcion el mensaje de error que vienen en cada clave del objeto
            const [fn, errorMessage] = formValidations[formField];
            // Aquí creamos la clave displayNameValid, emailValid, passwordValid
            // y le asignamos el valor de null si la condicion de la funcion se cumple, o si no el erroMessage
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;

        }

        // Finalmente se lo asignamos al formValidation del useState que controla eso
        // Usamos useState porque necesitamos redibujar el componente cuando se manden los errorMessage del objeto
        setFormValidation( formCheckedValues );

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}