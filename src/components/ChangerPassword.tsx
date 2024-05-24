import Footer from "./Footer";
import { useContext, useState } from "react";
import AuthService from "../services/AuthService";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import context from "../context";
import CircularProgress from "@mui/material/CircularProgress";

const user = yup
  .object({
    currentPassword: yup
      .string()
      .required("Ingrese su contraseña actual")
      .test(
        "password-validation",
        "Ingrese su contraseña actual",
        (value: any) => {
          if (!value) {
            return false;
          }
          return value && value.length >= 8;
        }
      ),
    password: yup
      .string()
      .required("Ingrese su nueva contraseña")
      .test(
        "password-validation",
        "Ingrese su nueva contraseña",
        (value: any) => {
          if (!value) {
            return false;
          }
          return value && value.length >= 8;
        }
      ),
  })
  .required();
/////////////
type FormData = yup.InferType<typeof user>;
//////////
////////
const ChangerPassword = () => {
  const [password, setPassWord] = useState<string>();
  const [confirmPassword, setConfirmPassWord] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const ctx = useContext(context);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(user),
  });
  const onSubmit = async (data: FormData) => {
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    const checkCurrentPassword = await AuthService.login({
      email: ctx?.currentUser?.email!,
      password: data.currentPassword,
    });
    if (checkCurrentPassword.data) {
      await AuthService.changerPass({
        password: data.password,
      });
      setLoading(false);
      localStorage.clear();
      alert("Su contraseña ha sido actualizada correctamente");
      window.location.href = "/";
    } else {
      setLoading(false);
      setErrorMessage("Su contraseña actual no es correcta");
    }
  };
  //////
  return (
    <div className='background-login' style={{ pointerEvents: loading ? "none" : "auto" }}>
      <div style={{ paddingBottom: "15%" }}>
        <div className="wrapper">
          <div className="forgot-container">
            <Link
              to="/"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              <p className="logintitle" style={{ fontSize: "20px" }}>
                <span className="logintitle" style={{ fontSize: "30px" }}>
                  ←
                </span>{" "}
                ATRÁS
              </p>
            </Link>
            <div style={{ textAlign: "center" }}>
              <Link to="/">
                <img
                  src="images/logo_combowork_720.png"
                  loading="lazy"
                  alt=""
                  className="image-2"
                />
              </Link>
            </div>
            <div className="div-block"></div>
            <div className="wrapperlogin" style={{ width: "100%" }}>
              <div className="block">
                <form
                  className="form"
                  onSubmit={handleSubmit(onSubmit)}
                  onFocus={() => setErrorMessage("")}
                >
                  <label className="txtlabel" style={{color: 'black'}}>
                    Ingrese su contraseña actual
                  </label>
                  <input
                    type="password"
                    className="inputlogin w-input"
                    {...register("currentPassword")}
                    onChange={(e) => setPassWord(e.target.value)}
                    onFocus={() => setError("currentPassword", {})}
                  />
                  <label className="txtlabel" style={{color: 'black'}}>
                    Ingrese su nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="inputlogin w-input"
                    {...register("password")}
                    onChange={(e) => setPassWord(e.target.value)}
                    onFocus={() => setError("password", {})}
                  />
                  <label className="txtlabel" style={{color: 'black'}}>
                    Ingrese otra vez su nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="inputlogin w-input"
                    onChange={(e) => setConfirmPassWord(e.target.value)}
                  />
                  <p style={{ color: "red" }}>{errors.password?.message}</p>
                  <div
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
                  </div>
                  <div className="wrapperbuttonlogin">
                    <button
                      style={{
                        backgroundColor: "#2c3b5f",
                        borderRadius: "9px",
                        color: "white",
                        padding: "13px 13px",
                        fontSize: "20px"
                      }}
                      type="submit"
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangerPassword;
