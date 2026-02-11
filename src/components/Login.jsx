import { useState } from "react"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export default function Login({ setUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [register, setRegister] = useState(false)

  const handleSubmit = async () => {
    try {
      let userCredential

      if (register) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password)
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password)
      }

      // 🔥 EN ÖNEMLİ SATIR
      setUser(userCredential.user)

    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">
          {register ? "Kayıt Ol" : "Giriş Yap"}
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white w-full py-2 rounded"
        >
          {register ? "Kayıt Ol" : "Giriş Yap"}
        </button>

        <p
          className="text-sm text-center cursor-pointer text-purple-600"
          onClick={() => setRegister(!register)}
        >
          {register ? "Zaten hesabın var mı?" : "Hesap oluştur"}
        </p>
      </div>
    </div>
  )
}
