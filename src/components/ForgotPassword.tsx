import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

interface Props {
  email: string;
  userIdRecoverPass?: number | undefined;
}
////
const user = yup
  .object({
    mail: yup.string().email("El mail es invalido").required("Email requerido"),
    resetKey: yup
      .string()
      .test("resetKey-validation", "Clave temporal inválida", (value: any) => {
        if (!value) {
          return false;
        }
        return value && value.length >= 5;
      })
      .required("Este campo es requerido"),
    password: yup
      .string()
      .required("Ingrese contraseña")
      .test("password-validation", "Ingrese email", (value: any) => {
        if (!value) {
          return false;
        }
        return value && value.length >= 8;
      }),
  })
  .required();
////
type FormData = yup.InferType<typeof user>;
////
const ForgotPassword = ({ email }: Props) => {
  const [password, setPassWord] = useState<string>();
  const [confirmPassword, setConfirmPassWord] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  ////
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(user),
  });
  ///
  ///
  const onSubmit = async (data: FormData) => {
    if (password !== confirmPassword) {
      setErrorMessage("las contraseñas no coinciden");
      return;
    }
    const resp = await AuthService.passReset({
      email: data.mail,
      resetKey: data.resetKey,
      password: data.password,
    });
    if (resp.hasError) {
      setErrorMessage(resp.msg);
      return;
    }
    alert("Ud ha actualizado su contraseña existosamente");
    window.location.href = "/";
  };
  ////
  return (
    <div className="background-login">
      <div className="wrapper" >
        <div className="forgot-container">
          <a
            href="/"
            style={{
              display: "flex",
              textDecoration: "none",
              width: "fit-content",
            }}
        >
          <p className="logintitle" style={{ fontSize: "20px" }}>
            <span className="logintitle" style={{ fontSize: "38px" }}>
              ←
            </span>{" "}
            ATRÁS
          </p>
        </a>
        <div style={{ textAlign: "center" }}>
          <Link to="/">
            <img
              src="images/logo_combowork_720.png"
              loading="lazy"
              alt="logo_combowork_720.png"
              className="image-2"
            />
          </Link>
        </div>
        <div className="div-block">
          <div className="logintitle">Recupero de contraseña</div>
        </div>
        <div className="wrapperlogin" style={{ width: "100%" }}>
          <div className="block">
            <form 
              id="email-form"
              name="email-form"
              data-name="Email Form"
              method="get"
              className="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="name" className="txtlabel" style={{color: 'black'}}>
                Email
              </label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                value={email}
                {...register("mail")}
              />
              <label className="txtlabel" style={{color: 'black'}}>Clave temporal</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("resetKey")}
                onFocus={() => setErrorMessage("")}
              />
              <p style={{ color: "red" }}>{errors.resetKey?.message} </p>
              <label htmlFor="email" className="txtlabel" style={{color: 'black'}}>
                Nueva contraseña
              </label>
              <input
                type="password"
                className="inputlogin w-input"
                maxLength={256}
                {...register("password")}
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
                onFocus={() => setErrorMessage("")}
              />
              <p style={{ color: "red" }}>{errors.password?.message}</p>
              <label htmlFor="email" className="txtlabel" style={{color: 'black'}}>
                Ingrese nuevamente su contraseña
              </label>
              <input
                type="password"
                className="inputlogin w-input"
                maxLength={256}
                onChange={(e) => {
                  setConfirmPassWord(e.target.value);
                }}
                onFocus={() => setErrorMessage("")}
              />
              <p style={{ color: "red" }}>
                {errors.password?.message} {errorMessage}
              </p>
              <div className="wrapperbuttonlogin">
                <button
                  style={{
                    backgroundColor: "#2c3b5f",
                    borderRadius: "9px",
                    color: "white",
                    width: "35%",
                    padding: "10px",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    fontSize: "14px",
                  }}
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ForgotPassword;
