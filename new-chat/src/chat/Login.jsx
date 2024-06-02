import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuUserCircle2 } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function addItem(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("email") !== "" && formData.get("senha") !== "") {
      const newItem = {
        nome: formData.get("nome"),
        email: formData.get("email"),
        senha: formData.get("senha"),
      };

      setItems([...items, newItem]);

      form.reset();
      setErrorMessage("");

      // Navegar para a tela de chat após login bem-sucedido
      navigate("/Chat");
    } else {
      setErrorMessage("Preencha todos os campos!");
    }
  }

  useEffect(() => {
    let _lista = localStorage.getItem("_lista");
    if (_lista && _lista !== "undefined") {
      _lista = JSON.parse(_lista);
      if (_lista) setItems(_lista);
    }
  }, []);

  useEffect(() => {
    if (items?.length > 0) {
      localStorage.setItem("_lista", JSON.stringify(items));
    }
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <form
        onSubmit={addItem}
        method="get"
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <fieldset>
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-5">
            Bem-Vindo
          </h2>
          <div className="flex items-center justify-center mb-4">
            <LuUserCircle2 size={70} />
          </div>
          <div className="mb-4">
            <label htmlFor="userNome" className="block text-gray-700">
              Nome
            </label>
            <input
              id="userNome"
              name="nome"
              type="text"
              className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-gray-700">
              E-mail
            </label>
            <input
              id="userEmail"
              name="email"
              type="text"
              className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userSenha" className="block text-gray-700 flex items-center">
              Senha
              <FaRegEye className="ml-2" />
              <FaRegEyeSlash className="ml-2" />
            </label>
            <input
              id="userSenha"
              name="senha"
              type="password"
              className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            {!!errorMessage && (
              <div className="mt-1 text-red-500 font-semibold">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            >
              Entrar
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black font-semibold py-2 px-4 rounded hover:bg-gray-400"
            >
              Cadastrar
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
