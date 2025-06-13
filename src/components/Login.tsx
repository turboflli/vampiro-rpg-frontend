import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";
import { useState } from "react";
import { login } from "../services/loginService";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(username, password);

    if (res) {
      saveToken(res.token);
      navigate("/");
    } else {
      alert(t("login.error"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-4/12 mx-auto p-6 bg-white shadow-2xl rounded-lg text-black">
        <div className="mb-4 flex flex-col items-center gap-4">
            <input type="text" placeholder={t("username")} className="border p-2" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder={t("password")} className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className="bg-blue-500 text-white p-2">{t("login")}</button>      
        </div>
    </form>
  );
}