import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Order.css";

export default function Order() {
  const [boyut, setBoyut] = useState("Orta");
  const [hamur, setHamur] = useState("Normal");
  const [secilenMalzemeler, setSecilenMalzemeler] = useState([]);
  const [name, setName] = useState("");
  const [not, setNot] = useState("");
  const [counter, setCounter] = useState(1);
  const history = useHistory();
  
  const pizzaFiyatlari = {
    "Küçük": 85.5,
    "Orta": 95.5,
    "Büyük": 105.5
  };

  const malzemeler = [
    "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan","Domates","Mısır","Sucuk","Jalepone","Sarımsak","Biber","Sucuk","Ananas","Kabak"
  ];

  const handleSubmit1 = (event) => {
    event.preventDefault();

    if (name.length < 3 || boyut === "" || hamur === "") {
      alert("Zorunlu alanlar boş");
      return;
    }

    const siparisVerisi = {
      isim: name,
      boyut,
      hamur,
      malzemeler: secilenMalzemeler,
      adet: counter,
      not
    };

    axios.post(
  "https://reqres.in/api/pizza",
  siparisVerisi,
  {
    headers: {
      "x-api-key": "reqres-free-v1"
    }
  }
)
.then((response) => {
  console.log("API yanıtı:", response.data); // Yanıtı konsola bas
  history.push({
    pathname: "/success",
    state: siparisVerisi
  });
})
.catch((error) => {
  console.error("Bir hata oluştu:", error);
});

  };

  const increase = () => setCounter(counter + 1);
  const decrease = () => counter > 1 && setCounter(counter - 1);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked && secilenMalzemeler.length < 10) {
      setSecilenMalzemeler([...secilenMalzemeler, value]);
    } else if (!checked) {
      setSecilenMalzemeler(secilenMalzemeler.filter(m => m !== value));
    }
  };

  const malzemeFiyat = secilenMalzemeler.length * 5;
  const toplamFiyat = (pizzaFiyatlari[boyut] + malzemeFiyat) * counter;

  return (
    <div className="order-page">
      {/* Üst Kırmızı Banner */}
      <div className="order-header">
        <h1>Teknolojik Yemekler</h1>
        <div className="breadcrumb">
          Anasayfa - Sipariş Oluştur
        </div>
      </div>
      
      <div className="pizza-info">
        <h2>Position Absolute Acı Pizza</h2>
        <div className="pizza-price">{pizzaFiyatlari[boyut] || 0}₺</div>
        <p className="pizza-description">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
        </p>
      </div>

      {/* Sipariş Formu */}
      <form className="order-container" href="/success" onSubmit={handleSubmit1}>
        {/* Boyut Seç */}
        <h4>Boyut Seç</h4>
        <div className="radio-group">
          {["Küçük", "Orta", "Büyük"].map((b) => (
            <label key={b} className="radio-label">
              <input
                type="radio"
                name="boyut"
                value={b}
                checked={boyut === b}
                onChange={(e) => setBoyut(e.target.value)}
              />
              {b}
            </label>
          ))}
        </div>

        {/* Hamur Seç */}
        <div className="form-section">
          <h4 className="section-title">Hamur Seç <span className="required">*</span></h4>
          <select value={hamur} onChange={(e) => setHamur(e.target.value)}>
            <option value="İnce">İnce Hamur</option>
            <option value="Normal">Normal Hamur</option>
            <option value="Kalın">Kalın Hamur</option>
          </select>
        </div>

        {/* Malzeme Seçimi */}
        <h4>Ek Malzemeler</h4>
        <p>En fazla 10 malzeme seçebilirsiniz. (5₺)</p>
        <div className="checkbox-group">
          {malzemeler.map((malzeme) => (
            <label key={malzeme} className="checkbox-label">
              <input
                type="checkbox"
                value={malzeme}
                checked={secilenMalzemeler.includes(malzeme)}
                onChange={handleCheckboxChange}
                disabled={
                  !secilenMalzemeler.includes(malzeme) &&
                  secilenMalzemeler.length >= 10
                }
              />
              {malzeme}
            </label>
          ))}
        </div>

        {/* İsim */}
        <div className="form-section">
          <h4 className="section-title">İsminiz <span className="required">*</span></h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="İsminizi giriniz"
            className="name-input"
          />
        </div>

        {/* Not */}
        <h4>Sipariş Notu</h4>
        <textarea
          value={not}
          onChange={(e) => setNot(e.target.value)}
          placeholder="Siparişinize eklemek istediğiniz bir not var mı?"
        />

        {/* Adet Seç */}
        <h4>Adet Seç</h4>
        <div className="counter-container">
          <button type="button" onClick={decrease}>-</button>
          <span>{counter}</span>
          <button type="button" onClick={increase}>+</button>
        </div>

        {/* Toplam Fiyat */}
        <div className="form-section">
          <h4 className="section-title">Sipariş Özeti</h4>
          <div className="price-summary">
            <div className="price-row">
              <span>Pizza Ücreti ({boyut}):</span>
              <span>{pizzaFiyatlari[boyut].toFixed(2)}₺</span>
            </div>
            {secilenMalzemeler.length > 0 && (
              <div className="price-row">
                <span>Ekstra Malzemeler ({secilenMalzemeler.length} x 5₺):</span>
                <span>{(secilenMalzemeler.length * 5).toFixed(2)}₺</span>
              </div>
            )}
            {counter > 1 && (
              <div className="price-row">
                <span>Adet ({counter}):</span>
                <span>×{counter}</span>
              </div>
            )}
            <div className="price-row total">
              <span>Toplam:</span>
              <span>{toplamFiyat.toFixed(2)}₺</span>
            </div>
          </div>
        </div>

        {/* Gönder */}
        <button type="submit">SİPARİŞ VER</button>
      </form>
    </div>
  );
}




