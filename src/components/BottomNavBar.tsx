import { useContext } from "react";
import { Link } from "react-router-dom";
import context from "../context";



function BottomNavBar() {
  
  const userLogged = useContext(context);
  const logOut = () => {
  
    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    //SETCURRENTUSER FROM CTX HERE
    userLogged?.setCurrentUser(undefined); // log out set user from context as undefine
    localStorage.clear();
  };
  return (
    <div className="bottomnavbar">

      <a href="/" style={{textDecoration: 'none', color: "black"}}>
      <div className="icono">
        <img
          src="images/home.png"
          loading="lazy"
          alt=""
          className="imageicon"
          />
        <div className="txticon">Inicio</div>
      </div>
          </a>
          
          <a href="https://combowork.ar" style={{textDecoration: 'none', color: "black"}}>
      <div className="icono">
        <img
          src="images/us.png"
          loading="lazy"
          alt=""
          className="imageicon"
        />
        <div className="txticon">Nosotros</div>

      </div>
      </a>
      <a href="/changemypassword" style={{textDecoration: 'none', color: "black"}}>
      <div className="icono">
        <img
          src="images/changePass.png"
          loading="lazy"
          alt=""
          className="imageicon"
        />
        <div className="txticon">
          Cambiar
          <br />
          contraseña
        </div>
      </div>
      </a>

      <a href="/" onClick={logOut} style={{textDecoration: 'none', color: "black"}}>
      <div className="icono">
        <img
          src="images/logout.png"
          loading="lazy"
          alt=""
          className="imageicon"
        />
        <div className="txticon">
          Cerrar
          <br />
          sesión
        </div>
          
      </div>
      </a>
    </div>
  );
}

export default BottomNavBar;

