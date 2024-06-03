import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Chat() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("usuario");
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || "Usuário";

  useEffect(() => {
    const _lista = localStorage.getItem("_lista");
    if (_lista && _lista !== "undefined") {
      const parsedList = JSON.parse(_lista);
      if (parsedList) setItems(parsedList);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("_lista", JSON.stringify(items));
    } else {
      localStorage.removeItem("_lista");
    }
  }, [items]);

  function addItem(event) {
    event.preventDefault();

    if (message.trim() !== "") {
      const newItem = {
        id: Date.now(),
        text: message,
        user: user,
      };

      setItems((prevItems) => [...prevItems, newItem]);
      setMessage("");
    }
  }

  function trocarUsuario() {
    setUser((prevUser) => (prevUser === "usuario" ? "atendente" : "usuario"));
  }

  function limparMensagens() {
    setItems([]);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md">
        <fieldset>
          <h2 className="mb-5 text-center text-3xl font-semibold text-gray-800">
            Atendimento Online
          </h2>
          <p className="mb-5 text-center font-semibold text-gray-800">
            Chat com nossos atendentes
          </p>
          <div className="mb-4 flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/Login")}
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={limparMensagens}
              className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
            >
              Apagar
            </button>
          </div>
          <ul className="mb-4 min-h-60 max-h-60 overflow-y-auto rounded border p-2">
            {items.map((item) => (
              <li
                key={item.id}
                className={`flex ${item.user === 'usuario' ? 'justify-end items-end' : 'justify-start items-start'}`}
              >
                <div className={`p-2 break-words rounded-xl min-w-44 max-w-44 m-1 ${item.user === 'usuario' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                  <span className="font-semibold">{item.user === "usuario" ? `${userName}` : "Atendente"}</span>
                  <br />
                  {item.text}
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={addItem}>
            <div className="flex space-x-4">
              <input
                id="mensagem"
                name="texto"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="box-border block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                placeholder="Digite sua mensagem"
              />
              <button
                type="submit"
                className="shadow-sm rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={trocarUsuario}
                className="shadow rounded bg-white px-4 py-2 font-semibold text-black hover:bg-gray-300"
              >
                Trocar
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
}
