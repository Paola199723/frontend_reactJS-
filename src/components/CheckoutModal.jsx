// src/components/CheckoutModal.jsx
import React, { useState } from "react";
import "./CheckoutModal.css";

export default function CheckoutModal({ onClose }) {
  const [form, setForm] = useState({
    number: "",
    cvc: "",
    exp_month: "",
    exp_year: "",
    card_holder: "",
    installments: "1",
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log("Datos del formulario:", form);
    // Aquí puedes luego agregar el flujo de consumo de las APIs
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Información de Tarjeta</h2>

        <input type="text" name="card_holder" placeholder="Titular de la tarjeta" onChange={handleChange} />
        <input type="text" name="number" placeholder="Número de tarjeta" onChange={handleChange} />
        <input type="text" name="cvc" placeholder="CVC" onChange={handleChange} />
        <input type="text" name="exp_month" placeholder="Mes expiración (MM)" onChange={handleChange} />
        <input type="text" name="exp_year" placeholder="Año expiración (YY)" onChange={handleChange} />

        <label>Número de cuotas</label>
        <select name="installments" value={form.installments} onChange={handleChange}>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} cuota(s)</option>
          ))}
        </select>

        <label className="terms">
          <input type="checkbox" name="termsAccepted" onChange={handleChange} />
          Acepto términos y condiciones
        </label>

        <button disabled={!form.termsAccepted} onClick={handleSubmit}>
          Hacer Pedido
        </button>

        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
