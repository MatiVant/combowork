import { Typography } from "@mui/material"

const Footer = () => {
  return (
    <section className="footer-dark wf-section">
    <div className="container-2">
      <div className="footer-wrapper">
        
        <a  className="footer-brand w-inline-block">
          <img
            src="/images/logo_combowork_720.png"
            loading="lazy"
            alt=""
            className="image-4"
          />
        </a>
        <div style={{padding:20}}>
        <p className="txtlabel" style={{fontSize:'20px', lineHeight: '30px'}}>
        Te llevamos tu pedido directamente a tu trabajo al mejor precio, <br/>antes de que te vuelvas a tu casa
        </p>
        
        </div>
        <div className="footer-content">
          <div
            id="w-node-ed62f0c0-9d8f-152c-2566-37288f99b9c8-8f99b9c2"
            className="footer-block"
          > 
          </div>
          <div
            id="w-node-ed62f0c0-9d8f-152c-2566-37288f99b9d1-8f99b9c2"
            className="footer-block"
          >
          </div>
          <div
            id="w-node-ed62f0c0-9d8f-152c-2566-37288f99b9dc-8f99b9c2"
            className="footer-block"
          >
            <div className="title-small">Contacto</div>
            <a href="mailto:infocombowork@gmail.com.ar" className="footer-link">
              <img className="footer-social-link w-inline-block"
                src="/images/email.png"
              />
            </a>
            <a href="https://wa.me/3413110700" className="footer-link">
              <img className="footer-social-link w-inline-block"
                src="/images/whats.png"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-divider" />
    <div className="footer-copyright-center">Copyright © 2023 COMBO WORK</div>
  </section>
  )
}

export default Footer