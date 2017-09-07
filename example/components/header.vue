<<template>
  <div class="meta-info-header">
      <router-link to="/">Foo</router-link>
      <router-link to="/bar">Bar</router-link>
      <router-link to="/async">async</router-link>
  </div>
</template>
<style>
    .meta-info-header{
        height: 100px;
        line-height: 100px;
    }
    .meta-info-header a{
        margin-left: 20px;
    }
</style>
