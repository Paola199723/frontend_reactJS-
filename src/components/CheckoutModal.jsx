import { useState } from "react";
import { FaCcMastercard, FaCcVisa, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../api/api";
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
  const [cardType, setCardType] = useState(null);
  const [acceptanceToken, setAcceptanceToken] = useState(null);
  const [cardToken, setCardToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, loading, success, error
  const [showStatusModal, setShowStatusModal] = useState(false);
 const [invoiceData, setInvoiceData] = useState(null);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    if (name === "number") {
      val = val.replace(/\D/g, "").slice(0, 16);
      if (val.startsWith("5")) {
        setCardType("mastercard");
      } else if (val.startsWith("4")) {
        setCardType("visa");
      } else {
        setCardType(null);
      }
    }

    if (["cvc", "cvv", "exp_month", "exp_year"].includes(name)) {
      val = val.replace(/\D/g, "").slice(0, 3);
      if (name === "exp_month" || name === "exp_year") {
        val = val.slice(0, 2);
      }
    }

    if (name === "termsAccepted" && checked) {
      setLoadingToken(true);
      try {
        
        const res = await api.get("/merchant");
        const data = res.data;
        
        if (data.acceptance_token) {
          setAcceptanceToken(data.acceptance_token);
        } else {
          console.error("El campo 'acceptance_token' no está en la respuesta.");
        }
        
      } catch (err) {
        console.error("Error al obtener el acceptance_token:", err);
      } finally {
        setLoadingToken(false);
      }
    }

    setForm(prev => ({
      ...prev,
      [name]: val
    }));

    setErrors(prev => ({ ...prev, [name]: null }));
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

  const handleSubmit = async () => {
    if (!validate()) return;

    setPaymentStatus("loading");
    setInvoiceData(null);

    try {
      const payload = {
        number: form.number,
        cvc: form.cvc || form.cvv,
        exp_month: form.exp_month,
        exp_year: form.exp_year,
        card_holder: form.card_holder
      };

      const response = await api.post("/tokens/cards", payload);

      const data = response.data;
      const tokenId = data?.data?.id;

      if (tokenId) {
        setCardToken(tokenId);

        const paymentPayload = {
          acceptance_token: acceptanceToken,
          amount_in_cents: 3000000,
          currency: "COP",
          customer_email: "procesoseleccionbackend@yopmail.com",
          payment_method: {
            type: "CARD",
            installments: parseInt(form.installments),
            token: tokenId
          },
          reference: "3b4393bafed398ba2",
          signature: "sk8-438k4-xmxm392-sn2m2490000COPprv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg"
        };
        console.log("📦 Payload que se enviará:", paymentPayload);

        const paymentRes = await api.post("/payment", paymentPayload);
        const paymentResult = paymentRes.data;
        console.log("🟢 Resultado del pago:", paymentResult);
        setPaymentStatus("success");
        setInvoiceData(paymentResult);
        setShowStatusModal(true);
      } else {
        setPaymentStatus("error");
        setShowStatusModal(true);
        setInvoiceData(null);
      }
    } catch (error) {
      console.error("❌ Error al procesar el pago:", error);
      setPaymentStatus("error");
      setShowStatusModal(true);
      setInvoiceData(null);
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
            disabled={loadingToken}
          />
          {loadingToken ? "Cargando términos..." : "Acepto términos y condiciones"}
        </label>
        {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}

        {paymentStatus === "loading" && <div className="spinner"></div>}

        <button
          disabled={!form.termsAccepted || loadingToken || paymentStatus === "loading"}
          onClick={handleSubmit}
        >
          Hacer Pedido
        </button>
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>

      {/* Modal flotante de estado */}
      {showStatusModal && (
  <div className="status-modal">
    <div className="status-content">

      {paymentStatus === "success" ? (
        <>
          <FaCheckCircle size={50} color="green" />
          <p>¡Pago realizado con éxito!</p>

          {invoiceData && (
            <div className="invoice">
              <h3>🧾 Factura de Pago</h3>

              <div className="invoice-row">
                <span><strong>ID:</strong></span>
                <span>{invoiceData.id_transaction}</span>
              </div>

              <div className="invoice-row">
                <span><strong>Impuesto:</strong></span>
                <span>{invoiceData.impuesto}</span>
              </div>

              <div className="invoice-row">
                <span><strong>Total:</strong></span>
                <span>
                  ${invoiceData.total.toLocaleString("es-CO")}
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <FaTimesCircle size={50} color="red" />
          <p>Hubo un error al procesar el pago.</p>
        </>
      )}

      <button
        onClick={() => {
          setShowStatusModal(false);
          if (paymentStatus === "success") {
            onClose();
          }
        }}
      >
        Continuar
      </button>

    </div>
  </div>
      )}
    </div>
  );
}