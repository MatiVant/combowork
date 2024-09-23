import { useForm } from 'react-hook-form';
import UsersServices from '../services/UsersServices';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

///////////////////
const user = yup
  .object({
    firstName: yup
      .string()
      .min(3, 'requiere al menos de 3 caracteres')
      .required('su nombre es requerido'),
    lastName: yup
      .string()
      .min(2, 'requiere al menos de 2 caracteres')
      .required('su apellido es requerido'),
    dni: yup
      .string()
      .min(7, 'su dni deberia tener al menos 7 caracteres')
      .required('su DNI es requerido'),
    phone: yup.string().min(6, 'requiere 6 digitos').required(),
    companyCode: yup
      .string()
      .min(1, 'necesita el código de compañia')
      .required(),
    deliveryTime: yup
      .string()
      .oneOf(
        ['mañana', 'tarde'],
        'Debe seleccionar "mañana" o "tarde"',
      )
      .min(1, 'necesita ingresar su turno')
      .required(),
    companyTel: yup
      .string()
      .min(1, 'Ingrese un número para comunicarnos')
      .required(),
    mail: yup
      .string()
      .required('su email es requerido')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/,
        'formato de email invalido',
      ),
  })
  .required();
/////////
type FormData = yup.InferType<typeof user>;
////
const ShortSignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState('block');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(user),
  });
  ////////

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const resp = await UsersServices.create({
        user: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.mail,
          phone: data.phone,
          dni: data.dni,
        },
        deliveryTime: data.deliveryTime,
        companyCode: data.companyCode,
        companyTel: data.companyTel,
      });
      setLoading(false);
      if (resp.hasError) {
        setLoading(false);
        if (resp.msg.includes('Company')) {
          setErrorMessage('el codigo de compania es incorrecto');
        } else if (resp.msg.includes('email')) {
          setErrorMessage(
            'Revise su campo de correo electronico',
          );
        }
        return;
      }

      alert(
        `Bienvenido a ComboWork, Ud. recibio la contraseña en el siguiente correo: ${data.mail}`,
      );
      window.location.href = '/';
    } catch (error) {}
  };

  return (
    <div className="background-login" style={{ height: '100%' }}>
      <div
        className="container-signup"
        style={{ pointerEvents: loading ? 'none' : 'auto' }}
      >
        <div className="container">
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              padding: '30px 0 30px 0',
              width: 'fit-content',
            }}
          >
            <p
              className="logintitle"
              style={{ fontSize: '24px', marginLeft: 80 }}
            >
              <span style={{ fontSize: '38px' }}>←</span> ATRÁS
            </p>
          </Link>
          <div
            className="div-block"
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignContent: 'center',
            }}
          >
            <Link to="/">
              <img
                src="images/logo_combowork_720.png"
                loading="lazy"
                alt="logo_combowork_720.png"
                className="image-2"
              />
            </Link>
          </div>
          <div
            className="logintitle"
            style={{ marginBottom: '20px' }}
          >
            Formulario de registro
          </div>
          <div className="container-form">
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                onFocus={() => setErrorMessage('')}
              >
                <label className="txtlabel signup signup">
                  Nombre
                </label>
                <input
                  className="inputlogin w-input"
                  maxLength={256}
                  {...register('firstName')}
                />
                <p style={{ color: 'red' }}>
                  {errors.firstName?.message}
                </p>
                <label className="txtlabel signup">
                  Apellido
                </label>
                <input
                  className="inputlogin w-input"
                  maxLength={256}
                  {...register('lastName')}
                />
                <p style={{ color: 'red' }}>
                  {errors.lastName?.message}
                </p>

                <label className="txtlabel signup">Email</label>
                <input
                  type="email"
                  className="inputlogin w-input"
                  maxLength={256}
                  {...register('mail')}
                />
                <p style={{ color: 'red' }}>
                  {errors.mail?.message}
                </p>

                <label className="txtlabel signup">DNI</label>
                <input
                  className="inputlogin w-input"
                  maxLength={256}
                  {...register('dni')}
                />
                <p style={{ color: 'red' }}>
                  {errors.lastName?.message}
                </p>

                <label className="txtlabel signup">
                  Telefono
                </label>
                <input
                  className="inputlogin w-input"
                  maxLength={256}
                  {...register('phone')}
                />
                <p style={{ color: 'red' }}>
                  {errors.lastName?.message}
                </p>
                <label className="txtlabel signup">
                  Código de establecimiento
                </label>
                <input
                  className="inputlogin w-input"
                  maxLength={256}
                  {...register('companyCode')}
                  placeholder="Ingresá el código de tu estableciminto"
                />
                <label className="txtlabel signup">
                  Franja horaria de entrega
                </label>
                {/* <input
                  className="inputlogin w-input"
                  maxLength={256}
                  
                  
                /> */}
                <select
                  className="selectlogin w-input"
                  id="option-select"
                  {...register('deliveryTime')}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona tu turno
                  </option>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                </select>
                <label className="txtlabel signup">
                  Teléfono Contacto Establecimiento
                </label>
                <input
                  className="inputlogin w-input"
                  maxLength={256}
                  {...register('companyTel')}
                  placeholder="Ingresá un numero de contacto del establecimiento"
                />
                <p style={{ color: 'red' }}>
                  {errors.companyCode?.message}
                </p>

                <div
                  style={{
                    marginTop: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <p style={{ color: 'red' }}>
                      {' '}
                      {errorMessage}{' '}
                    </p>
                  )}
                </div>
                <div className="wrapperbuttonlogin">
                  <button
                    style={{
                      margin: '35px',
                      backgroundColor: '#2c3b5f',
                      borderRadius: '9px',
                      color: 'white',
                      padding: '16px 12px',
                    }}
                    type="submit"
                  >
                    Registrarme
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

export default ShortSignUp;
