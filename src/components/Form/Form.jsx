import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import useTelegram from "../../hooks/useTelegram";
const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [selectOpt, setSelectOpt] = useState("ph");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      selectOpt,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, selectOpt]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, []);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangeOption = (e) => {
    setSelectOpt(e.target.value);
  };

  return (
    <div className="form">
      <h3>Введите ваши данные</h3>
      <input
        onChange={onChangeCountry}
        className="input"
        type="text"
        placeholder="Страна"
        value={country}
      />
      <input
        onChange={onChangeStreet}
        className="input"
        type="text"
        placeholder="Улица"
        value={street}
      />
      <select value={selectOpt} onChange={onChangeOption} className="select">
        <option value="ph">Физ.Лицо</option>
        <option value="jr">Юр.Лицо</option>
      </select>
    </div>
  );
};

export default Form;
