import styles from "./Register.module.css"
import { useAuthentication } from "../../hooks/useAuthentication";

import { useState, useEffect } from "react"

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError(""); // Após envio de form zera os erros

    const user = { // Cria o objeto usuário
      displayName,
      email,
      password
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    const res = await createUser(user)

    console.log(res)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }

  }, [authError]);

  return (
    <div>
      <h1>Efetue o registro para criar seus próprios posts</h1>
      <p>Crie seu usuário e compartilhe suas experiências</p>
      <form onSubmit={handleSubmit}>
        <label>
          {/* <span>Nome:</span> */}
          <input type="text" name="displayName" required placeholder="Nome de usuário" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label>
          {/* <span>E-mail:</span> */}
          <input type="email" name="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          {/* <span>Senha:</span> */}
          <input type="password" name="password" required placeholder="Insira sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          {/* <span>Senha:</span> */}
          <input type="password" name="confirmPassword" required placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        {!loading && <button className="btn">Registrar</button>}
        {loading && <button className="btn" disabled>Cadastrando...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register
