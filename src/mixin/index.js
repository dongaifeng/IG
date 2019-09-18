const mixin = {
  components: {
    AIheader: () => import('@/components/AIheader')
  }
}


const bad = {
  components: {
    Page: () => import('@/components/Page')
  },
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
        size: this.size,
        current: page
      }).then(res => {
        // console.log(res)
        this.list = res.data || []
        this.total = res.Total
      })
    },
    pageClick(page) {
      this.currentPage = page
      this.init(page)
    }
  }
}


const page = {
  data() {
    return {
      total: 0,
      currentPage: 1
    }
  },
  components: {
    Page: () => import('@/components/Page')
  },
  methods: {
    pageClick(page) {
      this.currentPage = page
      this.initData(page)
    }
  }
}

export {
  mixin,
  bad,
  page
}