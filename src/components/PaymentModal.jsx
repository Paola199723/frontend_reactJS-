// src/components/PaymentModal.jsx
import React, { useEffect, useState } from "react";
import "./PaymentModal.css";

export default function PaymentModal({ onClose }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [installments, setInstallments] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [acceptanceToken, setAcceptanceToken] = useState("");

  // Identificar tarjeta automáticamente
  useEffect(() => {
    if (cardNumber.startsWith("4")) setCardType("Visa");
    else if (cardNumber.startsWith("5")) setCardType("Mastercard");
    else setCardType("");
  }, [cardNumber]);

  // Obtener token de aceptación
  useEffect(() => {
    fetch("http://localhost:3000/merchant")
      .then((res) => res.json())
      .then((data) => setAcceptanceToken(data.acceptance_token));
  }, []);

  const handlePay = async () => {
    if (!termsAccepted) return;

    // Consumir API para obtener token de tarjeta
    const tokenRes = await fetch("http://localhost:3000/tokens/cards");
    const tokenData = await tokenRes.json();
    const token = tokenData.data.id;

    if (!token) return;

    // JSON de prueba para pago
    const paymentPayload = {
      acceptance_token: acceptanceToken,
      amount_in_cents: 3000000,
      currency: "COP",
      reference: "3b4393bafed398ba2",
      signature: "sk8-438k4-xmxm392-sn2m2490000COPprv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg",
      customer_email: "example@wompi.co",
      payment_method: {
        type: "CARD",
        token,
        installments
      }
    };

    await fetch("http://localhost:3000/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentPayload)
    });

    alert("¡Pago procesado!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Datos de la tarjeta ({cardType})</h2>
        <input
          placeholder="Número de tarjeta"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <select value={installments} onChange={(e) => setInstallments(e.target.value)}>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} cuota(s)
            </option>
          ))}
        </select>
        <label style={{ marginTop: "1rem" }}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />{" "}
          Acepto los términos y condiciones
        </label>
        <button disabled={!termsAccepted} onClick={handlePay} style={{ marginTop: "1rem" }}>
          Pagar
        </button>
        <button onClick={onClose} className="close-btn">Cancelar</button>
      </div>
    </div>
  );
}
