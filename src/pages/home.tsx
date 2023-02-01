import type { Component } from "solid-js";

import MainLayout from "../layouts/main";

const Home: Component = () => {
  return (
    <MainLayout title="My Recipes">
      <p>Hello World</p>
    </MainLayout>
  );
};

export default Home;
