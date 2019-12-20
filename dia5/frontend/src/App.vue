<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand id="">Action Bag</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/ativos">Ativos</router-link></b-nav-item>
            <b-nav-item><router-link to="/carteira">Carteira</router-link></b-nav-item>
            <b-nav-item><router-link to="/performace">Performance</router-link></b-nav-item>
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
  color: #2c3e50;
}

#nav {
  padding: 30px;
  margin-bottom: 25px;
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
