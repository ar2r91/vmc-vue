<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="/img/muralla.png" height="50" width="140" alt="La Muralla">
        <!--<img class="navbar-brand-minimized" src="/img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">-->
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg"/>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <!-- <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge> -->
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <!-- <i class="icon-list"></i> -->
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <!-- <i class="icon-location-pin"></i> -->
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/> <!-- menu izquierdo -->
      </b-navbar-nav>
      <!-- <AsideToggler class="d-none d-lg-block" /> -->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <!--spinner-->
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter class="justify-content-center">
      <div>
        <img src="../../public/img/logo_zem.png" width="24" alt="">
        © 2020 | Zem Consulting S.A.
      </div>
    </TheFooter>
    <div id="loading" v-show="$store.state.loadingCount">
      <div class="center">
        <img src="/img/loading.svg" alt="Cargando...">
      </div>
    </div>
    <modal></modal>
  </div>
</template>

<script>
  import {
    Header as AppHeader,
    SidebarToggler,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    Aside as AppAside,
    AsideToggler,
    Footer as TheFooter,
    Breadcrumb
  } from '@coreui/vue'
  import DefaultAside from './DefaultAside'
  import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
  import Modal from "@/components/TermsAndConditions/Modal";

  export default {
    name: 'DefaultContainer',
    components: {
      AsideToggler,
      AppHeader,
      AppSidebar,
      AppAside,
      TheFooter,
      Breadcrumb,
      DefaultAside,
      DefaultHeaderDropdownAccnt,
      SidebarForm,
      SidebarFooter,
      SidebarToggler,
      SidebarHeader,
      SidebarNav,
      SidebarMinimizer,
      Modal
    },
    data() {
      return {
        nav: []
      }
    },
      mounted() {
      let nav = this.$store.getters['user/isApplicant'] ? (this.$store.getters['user/isApplicant_contractor']  ? require('@/_nav_contractor') : require('@/_nav_applicant') )  : require('@/_nav');
      this.nav = nav.default.items;
    },
    destroyed() {
      delete require.cache[require.resolve('@/_nav')]
    },
    computed: {
      name() {
        return this.$route.name
      },
      list() {
        return this.$route.matched.filter((route) => route.name || route.meta.label)
      }
    }
  }
</script>
