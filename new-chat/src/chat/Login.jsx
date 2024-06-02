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
        name: formData.get("email"),
        qtd: formData.get("senha"),
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
    <div className="p-6 flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={addItem}
        method="get"
        className="mt-6 w-full max-w-md rounded bg-white p-6 shadow-md"
      >
        <fieldset>
          <h2 className="mb-5 text-3xl font-semibold text-gray-800 text-center">
            Bem-Vindo
          </h2>
          <div className="flex items-center justify-center mb-4">
            <LuUserCircle2 size={70} />
          </div>
          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-gray-700">
              E-mail
            </label>
            <input
              id="userEmail"
              name="email"
              type="text"
              className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userSenha" className="block text-gray-600 flex items-center">
              Senha
              <FaRegEye className="ml-2" />
              <FaRegEyeSlash className="ml-2" />
            </label>
            <input
              id="userSenha"
              name="senha"
              type="password"
              className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {!!errorMessage && (
              <div className="mt-1 font-semibold text-red-500">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="font-semibold rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:pointer-events-none disabled:opacity-25"
            >
              Entrar
            </button>
            <button
              type="button"
              className="font-semibold rounded bg-white px-4 py-2 text-black hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-25"
            >
              Cadastrar
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
