import { CSSProperties, useEffect } from 'react';
import shoppingCartService from '../services/shoppingCartService';
import Header from './Header';

const center: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '70px',
  padding: '60px',
};

const containerIcon: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
};

const icon: CSSProperties = {
  width: '42px',
  height: '42px',
  marginLeft: '10px',
};

const text: CSSProperties = {
  marginLeft: '10px',
};

const PurchaseConfirmation: React.FC = () => {
  const redirect = () => {
    setTimeout(() => {
      window.location.href = ' https://www.codice.dev:3004';
      shoppingCartService.setEmpyArray();
    }, 5000);
  };
  //
  useEffect(() => {
    redirect();
  }, []);
  /////
  return (
    <div className="navbar-logo-left wf-section">
      <div
        data-animation="default"
        data-collapse="medium"
        data-duration={400}
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="navbar-logo-left-container shadow-three w-nav"
      >
        {<Header />}
      </div>
      <div style={center}>
        <img
          src="images/logo_combowork_720.png"
          loading="lazy"
          alt=""
          className="image-2"
        />
        <div className="logintitle">
          Su compra ha sido confirmada.
          <br />
          Gracias por elegirnos.
        </div>
        <div
          className="text-block-9"
          style={{ fontSize: '20px', marginTop: '20px' }}
        >
          Para volver al sitio <a href="/">click aquí</a> o
          espera y seras redireccionado.
        </div>
        <h6
          className="logintitle"
          style={{ marginTop: '60px', fontSize: '20px' }}
        >
          Seguinos en nuestras redes sociales!
          <br /> Nos encontras como:
        </h6>
        <div style={containerIcon}>
          <a>
            <img
              loading="eager"
              src="/images/instagram.png"
              alt=""
              style={icon}
            />
          </a>
          <h5 style={text}>Instagram: ComboWork</h5>
          <a>
            <img
              loading="eager"
              src="/images/whatsapp.png"
              alt=""
              style={icon}
            />
          </a>
          <h5 style={text}>WhatSapp: 3565667787</h5>
          <a>
            <img
              loading="eager"
              src="/images/gmail.png"
              alt=""
              style={icon}
            />
          </a>
          <h5 style={text}>Mail: comboWork@gmail.com</h5>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmation;
