<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand id="main">Aluga Bike</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
            <b-nav-item><router-link to="/usuarios">Usuários</router-link></b-nav-item>
            <b-nav-item><router-link to="/bicicletas">Bicicletas</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
}

#main{
  margin-left: 15px;
}

#nav {
  padding: 30px;
  margin-bottom: 50px;
}

#nav a {
  font-weight: bold;
  color: #fff;
  padding: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
