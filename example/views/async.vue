<template>
  <div>
      {{pageName === 'loading' ? pageName : 'this is '+pageName+' page'}}
  </div>
</template>

<script>
  export default {
    name: 'async',
    metaInfo () {
      return {
        title: this.pageName
      }
    },
    data () {
      return {
        pageName: 'loading'
      }
    },
    mounted () {
      setTimeout(() => {
        this.pageName = 'async'
      }, 2000)
    }
  }
</script>
