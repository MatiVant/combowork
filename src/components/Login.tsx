import React, { useContext, useState } from "react";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../types/user";
import * as yup from "yup";
import context from "../context";
import ForgotPassword from "./ForgotPassword";
import CircularProgress from "@mui/material/CircularProgress";
import shoppingCartService from "../services/shoppingCartService";
//
const user = yup
  .object({
    mail: yup
      .string()
      .email("El mail es invalido")
      .required("El mail es requerido"),
    password: yup
      .string()
      .required("Su contraseña no tiene la cantidad de caracteres correspondientes")
      .test(
        "password-validation",
        "Ingrese email y contraseña",
        (value: any) => {
          if (!value) {
            return false;
          }
          return value && value.length >= 8;
        }
      ),
  })
  .required();
////
type FormData = yup.InferType<typeof user>;
//////
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserForgotPass, setIsUserForgotPass] = useState<boolean>(false);
  const userLogged = useContext(context);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(user),
  });
  ////
  const getUser = async () => {
    const response = await AuthService.findUser();
    if (response.data === null) {
      setErrorMessage("Email o contraseña incorrectos");
    }
    if (response.data.state === "inactive") {
      setErrorMessage("El usuario se encuentra Inactivo");
    }
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    const storedCurrentUser = localStorage.getItem("currentUser");
    const initialCurrentUser: User | undefined = storedCurrentUser
      ? JSON.parse(storedCurrentUser)
      : undefined;
    // set state from context///
    userLogged?.setCurrentUser(initialCurrentUser);
  };
  ////
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await AuthService.login({
      email: data.mail,
      password: data.password,
    });
    shoppingCartService.setEmpyArray(); //init cart on empty array
    getUser(); // this func set the user on context
    setLoading(false);
  };
  ////
  const resetErrorsMessagges = () => {
    setErrorMessage("");
  };
  const confirmRecoverPassword = async (
    _event: React.MouseEvent<HTMLElement>
  ) => {
    if (
      confirm(
        `Si, necesito que me envien un código a mi correo ${email} para recuperar mi contraseña`
      )
    ) {
      setLoading(true);
      setError("password", {});
      const isEmailValid = await AuthService.passRecover({
        email: email,
      });
      /// show message when e mail is wrong
      if (isEmailValid.data === null) {
        setLoading(false);
        setErrorMessage("Ingrese un email válido");
        return;
      }
      /// render the forgotpassword component
      setIsUserForgotPass(true);
    }
    return; //when user cancel the recover pass alert
  };
  /////


  return !isUserForgotPass ? (

    
    <div className="background-login" style={{ pointerEvents: loading ? "none" : "auto" }}>
      <div className="wrapper">
        <Link to="/">
          <img
            src="images/logo_combowork_720.png"
            loading="lazy"
            alt="logo_combowork_720.png"
            className="image-2"
          />
        </Link>
        <div className="div-block">
          <div className="logintitle">Iniciar sesión</div>
        </div>
        <div className="wrapperlogin">
          <div >
            <form
              id="email-form"
              name="email-form"
              data-name="Email Form"
              method="get"
              style={{display: "flex", flexDirection: "column", gap: 8}}
              onSubmit={handleSubmit(onSubmit)}
              onFocus={resetErrorsMessagges}
              
            >
              <label htmlFor="name" className="txtlabel" style={{color:'black'}}>
                Email
              </label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("mail")}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p style={{ color: "red" }}></p>
              <label htmlFor="email" className="txtlabel" style={{color:'black'}}>
                Contraseña
              </label>
              <input
                type="password"
                className="inputlogin w-input"
                maxLength={256}
                {...register("password")}
              />
              <p style={{ color: "red" }}>{errors.password?.message}</p>
              {/* <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    {" "}
                    {errorMessage}{" "}
                  </p>
                )}
              </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <button className="buttonlogin"
                  style={{
                    backgroundColor: "#2c3b5f",
                    borderRadius: "13px",
                    color: "white",
                    padding: "10px",
                    marginBottom: "22px",
                    fontSize: "16px",
                    fontWeight: 200,
                    width: '120px',
                    
                  }}
                  type="submit"
                >
                  {loading ? (
                  <CircularProgress size="1rem" />
                ) : (
                  'Ingresar')}
                </button>
              </div>
            </form>
          </div>
          <div
            style={{ display: "grid", placeItems: "center", marginTop: "5px", gap: "5px"}}
          >
            <button
              style={{
                background: "transparent",
                fontSize: "16px"
              }}
              onClick={confirmRecoverPassword}
            >
              Olvidé mi contraseña
            </button>
            <Link
              to="/shortSignUp"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "16px"
              }}
            >
              Crear una cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ForgotPassword email={email} />
  );
};

export default Login;
