<template>
  <div>
    <Header></Header>
    <Content></Content>
  </div>
</template>


<script>
import Header from "./components/Header";
import Content from "./components/Content";

export default {
  components: {
    Header,
    Content,
  },
};
</script>

<style>
body {
  font-family: Garamond, serif;
}
</style>