import { useForm } from "react-hook-form";
import UsersServices from "../services/UsersServices";
import FilesService from "../services/FilesService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Textarea from "@mui/joy/Textarea";
import { Link } from "react-router-dom";
///////////////////
const user = yup
  .object({
    firstName: yup
      .string()
      .min(3, "requiere al menos de 3 caracteres")
      .required("su nombre es requerido"),
    lastName: yup
      .string()
      .min(2, "requiere al menos de 2 caracteres")
      .required("su apellido es requerido"),
    dni: yup
      .number()
      .min(7, "su dni deberia tener al menos 7 caracteres")
      .required("su DNI es requerido")
      .typeError("debe ser un numero"),
    cuit: yup
      .number()
      .min(11, "requiere 11 digitos, sin espacios si signos")
      .required("este campo es requerido")
      .typeError("debe ser un numero"),
    zipCode: yup.number().required().typeError("debe ser un numero"),
    companyCode: yup
      .string()
      .min(1, "necesita el código de compañia")
      .required(),
    placeOfBirth: yup
      .string()
      .min(3, "requiere 3 caracteres al menos")
      .required("este campo es requerido"),
    dateOfBirth: yup.string().required("la fecha de nacimiento es requerida"),
    address: yup.string().min(3, "requiere 3 caracteres al menos").required(),
    location: yup.string().min(3, "requiere 3 caracteres al menos").required(),
    phone: yup
      .number()
      .min(6, "requiere 6 digitos")
      .required()
      .typeError("debe ser un numero"),
    mail: yup
      .string()
      .required("su email es requerido")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/,
        "formato de email invalido"
      ),
    isUserPep: yup.boolean().required(),
    isUserPepDescription: yup.string().notRequired(),
    isUserSujetoObligado: yup.boolean().required(),
    solicitoIngresar: yup
      .boolean()
      .required()
      .test((value: boolean) => {
        if (!value) {
          return;
        }
        return value;
      }),
    dniFrente: yup.mixed<File[]>().notRequired(),
    dniDorso: yup.mixed<File[]>().notRequired(),
  })
  .required();
/////////
type FormData = yup.InferType<typeof user>;
////
const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState("block");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver<FormData>(user) });
  ////////
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      let storeImageFront: File | undefined = undefined;
      let storeImageDorso: File | undefined = undefined;
      if (data.dniFrente?.length) {
        const respData = (await FilesService.fileUpload(data.dniFrente[0]))
          .data;
        if (respData.length) storeImageFront = respData[0];
      }
      if (data.dniDorso?.length) {
        const respData = (await FilesService.fileUpload(data.dniDorso[0])).data;
        if (respData.length) storeImageDorso = respData[0];
      }
      const resp = await UsersServices.create({
        user: {
          firstName: data.firstName,
          lastName: data.lastName,
          dni: Number(data.dni),
          cuit: Number(data.cuit),
          zipCode: Number(data.zipCode),
          placeOfBirth: data.placeOfBirth,
          dateOfBirth: new Date(data.dateOfBirth).toISOString(),
          address: data.address,
          location: data.location,
          phone: Number(data.phone),
          email: data.mail,
          isUserPep: data.isUserPep,
          isUserPepDescription: data.isUserPepDescription,
          isUserSujetoObligado: data.isUserSujetoObligado,
          dniFrente: storeImageFront,
          dniDorso: storeImageDorso,
        },
        companyCode: data.companyCode,
      });
      setLoading(false);
      if (resp.hasError) {
        setLoading(false);
        if (resp.msg.includes("Company")) {
          setErrorMessage("el codigo de compania es incorrecto");
        } else if (resp.msg.includes("email")) {
          setErrorMessage("Revise su campo de correo electronico");
        }
        return;
      }

      alert(
        `Bienvenido a ComboWork, Ud. recibio la contraseña en el siguiente correo: ${data.mail}`
      );
      window.location.href = "/";
    } catch (error) {}
  };
  ///
  return (
    
    <div className="background-login" style={{height:"100%"}}>
    <div
      className="container-signup"
      style={{ pointerEvents: loading ? "none" : "auto" }}
    >
      <div className="container">
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            padding: "30px 0 30px 0",
            width: "fit-content",
          }}
        >
          <p className="logintitle" style={{ fontSize: "24px", marginLeft: 80 }}>
            <span style={{ fontSize: "38px" }}>←</span> ATRÁS
          </p>
        </Link>
        <div
          className="div-block"
          style={{ display: "flex", justifyContent: "space-evenly", alignContent: "center"}}
        >
          <Link to="/">
            <img
              src="images/logo_combowork_720.png"
              loading="lazy"
              alt="logo_combowork_720.png"
              className="image-2"
            />
          </Link>
          <Link to="/">
            <img
              src="images/unirBlanco.png"
              loading="lazy"
              alt="logo_unir.png"
              className="image-2"
            />
          </Link>
        </div>
        <div className="logintitle">Formulario de registro</div>
        <div className="container-form">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onFocus={() => setErrorMessage("")}
          
            >
              <label className="txtlabel signup signup">Nombre</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("firstName")}
              />
              <p style={{ color: "red" }}>{errors.firstName?.message}</p>
              <label className="txtlabel signup">Apellido</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("lastName")}
              />
              <p style={{ color: "red" }}>{errors.lastName?.message}</p>
              <label className="txtlabel signup">DNI</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("dni")}
              />
              <p style={{ color: "red" }}>{errors.dni?.message}</p>
              <label className="txtlabel signup">CUIT/CUIL</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("cuit")}
              />
              <p style={{ color: "red" }}>{errors.cuit?.message}</p>
              <label className="txtlabel signup">Código de compañía</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("companyCode")}
                placeholder="Si queres asociarte a Mutual Unir completa con: UNIR"
              />
              <p style={{ color: "red" }}>{errors.companyCode?.message}</p>
              <label className="txtlabel signup">Lugar de nacimiento</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("placeOfBirth")}
              />
              <p style={{ color: "red" }}>{errors.placeOfBirth?.message}</p>
              <label className="txtlabel signup">Código postal</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("zipCode")}
              />
              <p style={{ color: "red" }}>{errors.zipCode?.message}</p>
              <label className="txtlabel signup">Fecha de nacimiento</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                type="date"
                {...register("dateOfBirth")}
              />
              <p style={{ color: "red" }}>{errors.dateOfBirth?.message}</p>
              <label className="txtlabel signup">Domicilio</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("address")}
              />
              <p style={{ color: "red" }}>{errors.address?.message}</p>
              <label className="txtlabel signup">Localidad</label>
              <input
                className="inputlogin w-input"
                maxLength={256}
                {...register("location")}
              />
              <p style={{ color: "red" }}>{errors.location?.message}</p>
              <label className="txtlabel signup">Teléfono</label>
              <input
                type="number"
                className="inputlogin w-input"
                maxLength={256}
                {...register("phone")}
              />
              <p style={{ color: "red" }}>{errors.phone?.message}</p>
              <label className="txtlabel signup">Email</label>
              <input
                type="email"
                className="inputlogin w-input"
                maxLength={256}
                {...register("mail")}
              /> 
              <p style={{ color: "red" }}>{errors.mail?.message}</p>
              <div className="container" style={{marginTop: "80px"}}>
                <div>
                  <div className="txtlabel signup">
                    <h2>
                      DECLARACIÓN JURADA SOBRE LA CONDICIÓN DE PERSONA
                      POLÍTICAMENTE EXPUESTA (PEP)
                    </h2>
                    <div>
                      <p className="txtlabel signup" style={{lineHeight:"35px"}}>
                        El/la que suscribe declara bajo juramento que los datos
                        consignados en la presente son correctos, completos y
                        fiel expresión de la verdad, y que SI/NO se encuentra
                        incluido y/o alcanzado dentro de la "Nómina de Personas
                        Expuestas Políticamente" aprobada por la Unidad de
                        Información Financiera, que ha leído. Además, asume el
                        compromiso de informar en forma fehaciente cualquier
                        modificación que se produzca en los datos consignados,
                        dentro de los treinta (30) días de ocurrida, mediante la
                        presentación de una nueva declaración jurada.
                      </p>
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      <div
                        style={{
                          marginTop: "15px",
                          marginBottom: "15px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <label style={{ margin: 0, marginRight: "8px"}}>
                          Si, me encuentro excluido
                        </label>
                        <input
                          style={{ width: "18px", height: "18px"}}
                          type="checkbox"
                          {...register("isUserPep")}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              setDisplay("block");
                            } else setDisplay("none");
                          }}
                        />
                      </div>
                    </div>
                    <label style={{lineHeight:"30px"}}>
                      No, detallaré a continuación el motivo, especificando
                      artículo e inciso que lo comprende
                    </label>
                  </div>
                  <div>
                    <div style={{ display: display, marginTop: "15px" }}>
            
                      <div style={{ marginTop: "15px" }}>
                        <Textarea {...register("isUserPepDescription")} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="txtlabel signup" style={{ marginTop: "80px", lineHeight: "35px" }}>
                  <div>
                    <h2>
                      DECLARACIÓN JURADA DE SUJETO OBLIGADO PERSONA FÍSICA
                    </h2>
                      <div>
                        <p>
                          El/la que suscribe declara bajo juramento que los datos
                          consignados en la presente son correctos, completos y
                          fiel expresión de la verdad, y SI/NO se encuentra
                          alcanzado como Sujeto Obligado conforme el artículo 20
                          de la ley 25.246, sus modificatorias y complementarias.
                          En caso de estar alcanzado como Sujeto Obligado, y en
                          cumplimiento con lo establecido en el artículo 21 de la
                          Ley 25.246, sus modificatorias y complementarias, el
                          abajo firmante declara bajo juramento que da debida
                          observancia a las disposiciones vigentes en materia de
                          Prevención del Lavado de Activos y Financiación del
                          Terrorismo, por lo cual: l Tiene conocimiento del
                          alcance y propósitos establecidos en la Ley 25.246, sus
                          modificatorias y complementarias, y de las resoluciones
                          emitidas por la Unidad de Información financiera (UIF),
                          y cumple con la mencionada normativa. l Tiene
                          conocimiento de la responsabilidad, como sujeto
                          obligado, a informar a la UIF la existencia de
                          operaciones sospechosas. Además, asume el compromiso de
                          informar en forma fehaciente cualquier modificación que
                          se produzca en los datos consignados, dentro de los
                          treinta (30) días de ocurrida, mediante la presentación
                          de una nueva declaración jurada. (*) En caso afirmativo
                          remitir Constancia de Inscripción UIF a
                          areatecnica@previncaseguros.com.ar
                        </p>
                      </div>
                  </div>
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginTop: 15, marginRight: "8px" }}>
                      Me encuentro alcanzado como sujeto obligado
                    </label>
                
                    <input
                      style={{ width: "18px", height: "18px" }}
                      type="checkbox"
                      {...register("isUserSujetoObligado")}
                    />
                  </div>
                  <div style={{ marginTop: "24px" }}>
                    <p>
                      Quien suscribe, solicita ingresar a la Mutual
                      Universitarios de Rosario en la categoría de Socio
                      Adherente, aceptando las condiciones establecidas en el
                      Estatuto Social y Reglamentos, declarando bajo juramento
                      que los datos consignados en la presente son fiel
                      expresión de la verdad
                    </p>
                  </div>
                  <div style={{ marginTop: "24px" }}>
                    <label>
                    Enviar DNI (frente y dorso) a:
                    infocombowork@gmail.com
                    </label>
                    {/* <div
                      style={{
                        marginTop: "30px",
                        flexDirection: "column",
                        display: "flex",
                      }}
                    >
                      <input type="file" {...register("dniDorso")} ></input>
                      <br />
                      <input type="file" {...register("dniFrente")}></input>
                    </div> */}
                  </div>
                </div>
                <div>
                  <div>
                    <div
                      style={{
                        marginTop: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <label style={{ marginTop: 0, marginRight: "15px", color: 'white', lineHeight: "2rem"}}>
                        Acepto términos y condiciones
                      </label>
                      <input
                        style={{ width: "18px", height: "16px" }}
                        type="checkbox"
                        {...register("solicitoIngresar")}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "25px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <p style={{ color: "red" }}> {errorMessage} </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="wrapperbuttonlogin">
                  <button
                    style={{
                      margin: "35px",
                      backgroundColor: "#2c3b5f",
                      borderRadius: "9px",
                      color: "white",
                      padding: "16px 12px",
                      
                    }}
                    type="submit"
                  >
                    Registrarme
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignUp;
