import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppBackdrop from "../Components/Appdrop/AppBackdrop";
import { paths } from "./paths";
// import Data from "../json/Data.json";


// import HeaderBar from '../components/Header/HeaderBar';

const HeaderBar = React.lazy(() => import("../Components/Header/HeaderBar"));
const Books = React.lazy(() => import("../Components/Books/Books"));


const AppRoutes = () => {

  

  return (
    <Suspense fallback={<AppBackdrop show />}>
      <Routes>
        <Route
          id="Dashboard"
          path={paths.DASHBOARD}
          element={
            <div>
              <HeaderBar name="Dashboard" subtitle="" />
              <Books/>
            </div>
          }
        />
         <Route
          id="admin"
          path={paths.ADMIN}
          element={
            <div>
              <HeaderBar name="Admin" subtitle="" />
            </div>
          }
        />

        
       

         <Route
      id="notFound"
      path="*"
      element={
        <div>
          <HeaderBar name="404 - Page not found" subtitle="" />
         
        </div>
      }
    />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
