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

  const malzemeler = [
    "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan"
  ];

  const handleSubmit = (event) => {
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

    axios.post("https://reqres.in/api/pizza", siparisVerisi)
      .then(() => {
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
  const boyutFiyat = boyut === "Küçük" ? 85.5 : boyut === "Orta" ? 95.5 : 105.5;
  const toplamFiyat = (malzemeFiyat + boyutFiyat) * counter;

  return (
    <div className="order-page">
      {/* Üst Kırmızı Banner */}
      <div className="order-header">
        <h1>Teknolojik Yemekler</h1>
        <div className="breadcrumb">
          Ana Sayfa / <strong>Sipariş Oluştur</strong>
        </div>
      </div>

      {/* Sipariş Formu */}
      <form className="order-container" onSubmit={handleSubmit}>
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
        <h4>Hamur Seç</h4>
        <select value={hamur} onChange={(e) => setHamur(e.target.value)}>
          <option value="İnce">İnce Hamur</option>
          <option value="Normal">Normal Hamur</option>
          <option value="Kalın">Kalın Hamur</option>
        </select>

        {/* Malzeme Seçimi */}
        <h4>Ek Malzemeler</h4>
        <p>En fazla 10 malzeme seçebilirsiniz. (5$)</p>
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
        <h4>İsminizi Yazın</h4>
        <textarea
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="En az 3 harften oluşan bir isim yazın"
        />

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
        <div className="summary-container">
          <h5>Seçimler (Malzeme): {malzemeFiyat}$</h5>
          <h5>Toplam: {toplamFiyat}$</h5>
        </div>

        {/* Gönder */}
        <button type="submit">SİPARİŞ VER</button>
      </form>
    </div>
  );
}




