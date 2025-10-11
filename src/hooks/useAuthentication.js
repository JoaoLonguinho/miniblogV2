import { db, app } from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { useState, useEffect } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth(app)

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa ter mais de 6 carácteres"
            } else if (error.message.includes("e-mail-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else (
                systemErrorMessage = "Ocorreu um erro durante o cadastro"
            )
            setLoading(false)
            setError(systemErrorMessage)

        }

    };

    // Logout 

    const logout = () => {

        checkIfIsCancelled();
        signOut(auth);
    }

    // Login

    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            error.message.includes("user-not-found")
        } catch(error) {

            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado";
            } else if (error.message.includes("invalid-credential")){
                systemErrorMessage = "Senha incorreta."
            }
            else {
                systemErrorMessage = "Ocorreu um erro, contate o administrador do sistema"
                console.log(error)
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => { // Evita vazamento de memória
        return () => setCancelled(true);
    }, []);


    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}