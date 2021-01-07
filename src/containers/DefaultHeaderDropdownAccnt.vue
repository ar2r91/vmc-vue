<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <b-avatar size="md"
                :src="profile_img"
                class="mr-2"
                badge badge-variant="success"
      ></b-avatar>

      {{user.names}} &nbsp;
      <!-- {{this.user.name}} {{this.user.last_name}} -->
    </template>
    \
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Mi Cuenta</strong></b-dropdown-header>
      <b-dropdown-item @click="settings"><i class="fa fa-cog"/> Configuración</b-dropdown-item>
      <b-dropdown-item @click="signOut"><i class="fa fa-sign-out"/> Salir</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>
<style>
.app-header .dropdown-item {
  min-width: 0px;
}
</style>
<script>
  import {HeaderDropdown as AppHeaderDropdown} from '@coreui/vue'
  import {mapGetters} from 'vuex'
  import s3 from "@/services/aws";

  export default {
    name: 'DefaultHeaderDropdownAccnt',
    components: {
      AppHeaderDropdown
    },
    computed: {
      ...mapGetters(
        {'user': 'user/getUser'}
      )
    },
    data: () => {
      return {
        profile_img: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif',
      }
    },
    mounted() {
      let result = null;

      if (this.user.files) {
        result = this.user.files.find(obj => {
          return obj.variable === 'profile_img';
        })

        if (result) {
          this.loadImage(result.url);
        }
      }

    },
    methods: {
      loadImage(val) {
        let protocol = val.split(':')[0]
        if (protocol === 's3') {
          let img = val.split('/')
          let size = img.length
          let url = img[size - 1]
          this.profile_img = s3.getSignedUrl("getObject", {
            Bucket: `${process.env.VUE_APP_AWS_BUCKET}/lamuralla`,
            Key: url,
            Expires: 60
          });
        }
      },
      settings() {
        this.$router.push({name: 'account'}).catch(()=>{}); //catch para no mostrar error en consola al redundar
      },
      signOut() {
        this.$store.dispatch("user/logout").catch(error => {
          if (error.data.errors !== undefined) {
            this.errors = error.data.errors;
          }
        });
      }
    }
  }
</script>
