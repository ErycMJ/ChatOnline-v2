import { useState, useEffect } from "react";

export default function Chat() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  function addItem(event) {
    event.preventDefault();

    if (message.trim() !== "") {
      const newItem = {
        id: Date.now(),
        text: message,
      };

      setItems((prevItems) => [...prevItems, newItem]);
      setMessage(""); // Clear the input field after adding the message
    }
  }

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

  return (
    <div className="p-6 flex h-screen min-w-md items-center justify-center bg-gray-100">
      <div className="mt-6 w-full max-w-md rounded bg-white p-6 shadow-md">
        <fieldset>
          <h2 className="mb-5 text-3xl font-semibold text-gray-800 text-center">
            Atendimento Online
          </h2>
          <p className="mb-5 font-semibold text-gray-800 text-center">
            Chat com nossos atendentes
          </p>
          <ul className="mb-4 max-w-md overflow-y-auto border border-black p-2">
            {items.map((item) => (
              <li key={item.id} className="p-2 border border-gray-400">
                {item.text}
              </li>
            ))}
          </ul>
          <form onSubmit={addItem}>
            <div className="flex justify-between space-x-4">
              <input
                id="mensagem"
                name="texto"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="box-border mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="font-semibold rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:pointer-events-none disabled:opacity-25"
              >
                Enviar
              </button>
              <button
                type="button"
                className="font-semibold rounded bg-white px-4 py-2 text-black hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-25"
                onClick={() => setItems([])}
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
