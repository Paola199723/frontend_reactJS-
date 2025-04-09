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
    const token = tokenData.id;

    // JSON de prueba para pago
    const paymentPayload = {
      acceptance_token: acceptanceToken,
      amount_in_cents: 3000000,
      currency: "COP",
      signature: "sk8-438k4-xmxm392-sn2m2490000COPprv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg",
      customer_email: "example@wompi.co",
      payment_method: {
        type: "CARD",
        token,
        installments
      },
      payment_source_id: 1234,
      redirect_url: "https://mitienda.com.co/pago/resultado",
      reference: "83f1df15-3003-41ef-9d54-1e90003a6f68",
      expiration_time: "2025-06-09T20:28:50.000Z",
      customer_data: {
        phone_number: "573307654321",
        full_name: "Juan Alfonso Pérez Rodríguez",
        legal_id: "1234567890",
        legal_id_type: "CC"
      },
      shipping_address: {
        address_line_1: "Calle 34 # 56 - 78",
        address_line_2: "Apartamento 502, Torre I",
        country: "CO",
        region: "Cundinamarca",
        city: "Bogotá",
        name: "Pepe Perez",
        phone_number: "573109999999",
        postal_code: "111111"
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
