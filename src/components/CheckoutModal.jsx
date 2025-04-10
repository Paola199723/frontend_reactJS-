// src/components/CheckoutModal.jsx
import React, { useState } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import "./CheckoutModal.css";

export default function CheckoutModal({ onClose }) {
  const [form, setForm] = useState({
    number: "",
    cvc: "",
    cvv: "",
    exp_month: "",
    exp_year: "",
    card_holder: "",
    installments: "1",
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState(null); // 'visa' | 'mastercard' | null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    if (name === "number") {
      val = val.replace(/\D/g, "").slice(0, 16); // Solo números y máximo 16 dígitos
      if (val.startsWith("4")) {
        setCardType("mastercard");
      } else if (val.startsWith("5")) {
        setCardType("visa");
      } else {
        setCardType(null);
      }
    }

    if (name === "cvc" || name === "cvv" || name === "exp_month" || name === "exp_year") {
      val = val.replace(/\D/g, "").slice(0, 3);
      if (name === "cvc" || name === "cvv") val = val.slice(0, 3); // solo 3 dígitos
    }

    setForm(prev => ({
      ...prev,
      [name]: val
    }));

    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/^\d{16}$/.test(form.number)) {
      newErrors.number = "Número inválido. Debe tener 16 dígitos.";
    }

    if (cardType === "mastercard" && !/^\d{3}$/.test(form.cvc)) {
      newErrors.cvc = "CVC inválido. Solo para Mastercard (3 dígitos).";
    }

    if (cardType === "visa" && !/^\d{3}$/.test(form.cvv)) {
      newErrors.cvv = "CVV inválido. Solo para Visa (3 dígitos).";
    }

    if (!/^\d{2}$/.test(form.exp_month)) {
      newErrors.exp_month = "Mes inválido. Debe tener 2 dígitos.";
    }

    if (!/^\d{2}$/.test(form.exp_year)) {
      newErrors.exp_year = "Año inválido. Debe tener 2 dígitos.";
    }

    if (!form.termsAccepted) {
      newErrors.termsAccepted = "Debes aceptar los términos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Formulario válido:", form);
      // Aquí puedes consumir APIs
      onClose();
    } else {
      console.log("Errores en el formulario");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Información de Tarjeta</h2>

        <input
          type="text"
          name="card_holder"
          placeholder="Titular de la tarjeta"
          value={form.card_holder}
          onChange={handleChange}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="text"
            name="number"
            placeholder="Número de tarjeta"
            value={form.number}
            onChange={handleChange}
          />
          {cardType === "mastercard" && <FaCcMastercard size={24} color="#eb001b" />}
          {cardType === "visa" && <FaCcVisa size={24} color="#1a1f71" />}
        </div>
        {errors.number && <p className="error">{errors.number}</p>}

        {cardType === "mastercard" && (
          <>
            <input
              type="text"
              name="cvc"
              placeholder="CVC (solo Mastercard)"
              value={form.cvc}
              onChange={handleChange}
            />
            {errors.cvc && <p className="error">{errors.cvc}</p>}
          </>
        )}

        {cardType === "visa" && (
          <>
            <input
              type="text"
              name="cvv"
              placeholder="CVV (solo Visa)"
              value={form.cvv}
              onChange={handleChange}
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}
          </>
        )}

        <input
          type="text"
          name="exp_month"
          placeholder="Mes expiración (MM)"
          value={form.exp_month}
          onChange={handleChange}
        />
        {errors.exp_month && <p className="error">{errors.exp_month}</p>}

        <input
          type="text"
          name="exp_year"
          placeholder="Año expiración (YY)"
          value={form.exp_year}
          onChange={handleChange}
        />
        {errors.exp_year && <p className="error">{errors.exp_year}</p>}

        <label>Número de cuotas</label>
        <select name="installments" value={form.installments} onChange={handleChange}>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} cuota(s)</option>
          ))}
        </select>

        <label className="terms">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={form.termsAccepted}
            onChange={handleChange}
          />
          Acepto términos y condiciones
        </label>
        {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}

        <button disabled={!form.termsAccepted} onClick={handleSubmit}>
          Hacer Pedido
        </button>
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
