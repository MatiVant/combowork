import { BrowserRouter, Route, Routes } from "react-router-dom";
import context from "./context";
import { useState } from "react";
import { User } from "./types/user";
import { Product } from "./types/product";
import { routesDesable, routesEnable } from "./resources/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Category } from "./types/category";

function App() {
  const storedCurrentUser = localStorage.getItem("currentUser");
  const initialCurrentUser: User | undefined = storedCurrentUser
    ? JSON.parse(storedCurrentUser)
    : undefined;

  const [currentUser, setCurrentUser] = useState<User | undefined>(
    initialCurrentUser
  );
  const [currentProduct, setCurrentProduct] = useState<Product[] | undefined>();

  const [currentCategory, setCurrentCategory] = useState<Category[] | undefined>()

  return (
    <>
      <>
        <BrowserRouter>
          <context.Provider
            value={{
              currentUser,
              setCurrentUser,
              currentProduct,
              setCurrentProduct,
              currentCategory,
              setCurrentCategory,
            }}
          >
            {currentUser ? (
              <Routes>
                {routesEnable.map((r, index) => (
                  <Route path={r.path} element={r.element} key={index} />
                  ))}
              
              </Routes>
            ) : (
              <Routes>
                {routesDesable.map((r,index) => (
                  <Route path={r.path} element={r.element} key={index} />
                ))}
              </Routes>
            )}
            
            
          </context.Provider>
        </BrowserRouter>
        <ToastContainer
          position="bottom-center"
          autoClose={600}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </>
    </>
  );
}

export default App;
