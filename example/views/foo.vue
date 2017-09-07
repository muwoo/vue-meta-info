<<template>
  <div>
      this is foo page
  </div>
</template>

<script>
  export default {
    metaInfo () {
      return {
        title: this.title,
        meta: [{
          name: 'keyWords',
          content: 'foo test'
        }],
        link: [{
          name: 'rel'
        }]
      }
    },
    data () {
      return {
        title: 'foo'
      }
    }
  }
</script>
