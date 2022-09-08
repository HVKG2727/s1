import React, { useState } from 'react'
import { omit } from 'lodash'

//useForm => form validate custom hook

const initState = {
    name: "",
    email: "",
    image: "",
    mobile: "",
    address: ""
}

function useForm() {
    const [contact, setContact] = useState(initState)
    const [errors, setErrors] = useState({})

    //error printing logic
    const errPrint = (prop, msg) => {
        setErrors({ ...errors, [prop]: msg})
    }
    //validation function
    const validate = ( name, value) => {
       
       // console.log('name =', name + ", value =" + value);
        switch (name) {
            case "name":
                if(value.length === 0) {
                    errPrint(name, "Name field must be filled ")
                }else if(value.length < 3){
                    errPrint(name, "Name atleast have 3 letters")
                } else if(!new RegExp(/^[A-Za-z0-9]{3,16}$/).test(value)) {
                    errPrint(name, "Invalid Name")
                }else {
                    let newOb = omit(errors, name);
                    setErrors(newOb)
                }
                break;
            case"email": {
                if(value.length ===0 ){
                    errPrint(name, 'email must be filled')
                }else if (!new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)){
                    errPrint(name, 'Invalid Email format')
                }else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
            }
            break;
            case "mobile": 
            if(value.length ===0 ) {
                errPrint(name, 'mobile field must be filled')
            }else if (!new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).test(value)) {
            errPrint(name, 'Invalid Indian mobile num format')
    
            }else {
                let newOb = omit(errors, name)
                        setErrors(newOb)
            }
            break;
            case "password" :
                if(value.length ===0 ) {
                    errPrint(name, 'password field must me filled')
                }
                else if (value.length < 6) {
                    errPrint(name, 'password should contain min 6 charecters')
                }else if (!new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/).test(value)) {
                    errPrint(name, 'password can include only a-z, A-Z, 0-9, & * # - charecters')
                } else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
                break;
                default:
                    break;
        }
    }
    return {
        errors,
        validate
    }
}

export default useForm