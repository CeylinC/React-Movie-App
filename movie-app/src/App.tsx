import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import { Loading } from "./components";
import { routes } from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Loading height="100vh" />}>
          <Routes>
            {routes.map((route) => {
              if (route.route === undefined) {
                return <Route path="/log-in" element={route.element} />;
              } else {
                return (
                  <Route path={route.path} element={route.element}>
                    {route.route.map((subRoute) => {
                      return (
                        <Route
                          path={subRoute.path}
                          element={
                            <Suspense fallback={<Loading height="100vh" />}>
                              {subRoute.element}
                            </Suspense>
                          }
                        />
                      );
                    })}
                  </Route>
                );
              }
            })}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
