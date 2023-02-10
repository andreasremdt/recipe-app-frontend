import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";

const Home = lazy(() => import("./pages/home"));
const Recipe = lazy(() => import("./pages/recipe"));
const SignIn = lazy(() => import("./pages/sign-in"));
const SignUp = lazy(() => import("./pages/sign-up"));

const App: Component = () => {
  return (
    <MetaProvider>
      <Router>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/recipes/:id" component={Recipe} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
        </Routes>
      </Router>
    </MetaProvider>
  );
};

export default App;
