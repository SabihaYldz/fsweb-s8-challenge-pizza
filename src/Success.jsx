import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./Success.css";
import { Link } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const history = useHistory();
  const orderData = location.state;

  useEffect(() => {
    // orderData yoksa yönlendirme yapılabilir
  }, [orderData, history]);

  if (!orderData) {
    // Eğer doğrudan bu sayfaya gelinirse, ana sayfaya yönlendir
    useEffect(() => {
      const timer = setTimeout(() => {
        history.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }, [history]);
    
    return (
      <div className="success-redirect">
        <p>Geçersiz sipariş bilgisi. Ana sayfaya yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  // Toplam fiyatı hesapla
  const malzemeFiyati = orderData.malzemeler.length * 5; // Her malzeme 5 TL
  const toplamFiyat = (orderData.boyutFiyati || 0) + malzemeFiyati;

  return (
    <div className="success-page">
      <div className="success-container">
        <p className="logo-text">Teknolojik Yemekler</p>
        <h1 className="success-title">TEBRİKLER!</h1>
        <h2 className="success-subtitle">SİPARİŞİNİZ ALINDI!</h2>

        <div className="success-details">
          <div className="detail-row">
            <span className="label">Sipariş No</span>
            <span className="value">#{Math.floor(Math.random() * 1000000)}</span>
          </div>
          <div className="detail-row">
            <span className="label">İsim</span>
            <span className="value">{orderData.isim}</span>
          </div>
          <div className="detail-row">
            <span className="label">Boyut</span>
            <span className="value">{orderData.boyut}</span>
          </div>
          <div className="detail-row">
            <span className="label">Hamur</span>
            <span className="value">{orderData.hamur}</span>
          </div>
          <div className="detail-row">
            <span className="label">Ek Malzemeler</span>
            <span className="value">
              {orderData.malzemeler && orderData.malzemeler.length > 0 
                ? orderData.malzemeler.join(", ") 
                : "Ek malzeme seçilmedi"}
            </span>
          </div>
          <div className="detail-row">
            <span className="label">Not</span>
            <span className="value">{orderData.not || "Not bırakılmadı"}</span>
          </div>
          <div className="detail-row">
            <span className="label">Sipariş Adedi</span>
            <span className="value">{orderData.adet} adet</span>
          </div>
          <div className="detail-row">
            <span className="label">Toplam Ücret</span>
            <span className="value">{toplamFiyat} ₺</span>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/">
            <button>ANASAYFAYA DÖN</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
