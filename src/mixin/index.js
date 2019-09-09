const mixin = {
  components: {
    AIheader: () => import('@/components/AIheader')
  }
}


const bad = {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1
    }
  },
  mounted() {
    this.init(this.currentPage)
  },
  methods: {
    init(page) {
      this.$post(this.queryId, this.queryArr = [], {
        size: 10,
        current: page
      }).then(res => {
        console.log(res)
        this.list = res.data || []
        this.total = res.Total
      })
    },
    pageClick(page) {
      this.init(page)
    }
  }
}

export {
  mixin,
  bad
}