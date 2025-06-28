import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./Success.css";

export default function Success() {
  const location = useLocation();
  const history = useHistory();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      const timer = setTimeout(() => {
        history.replace("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [orderData, history]);

  if (!orderData) {
    return (
      <div className="success-redirect">
        <p>Yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-header">
        <p className="logo-text">TEKNOLOJİK YEMEKLER</p>
        <h1 className="success-title">Tebrikler! Siparişiniz alındı!</h1>
      </div>

      <div className="success-details">
        <p><strong>İsim:</strong> {orderData.isim}</p>
        <p><strong>Boyut:</strong> {orderData.boyut}</p>
        <p><strong>Hamur:</strong> {orderData.hamur}</p>
        <p><strong>Malzemeler:</strong> {orderData.malzemeler.length > 0 ? orderData.malzemeler.join(", ") : "Yok"}</p>
        <p><strong>Adet:</strong> {orderData.adet}</p>
        <p><strong>Not:</strong> {orderData.not || "Yok"}</p>

        <button onClick={() => history.push("/")}>Ana Sayfaya Dön</button>
      </div>
    </div>
  );
}


