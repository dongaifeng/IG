// const Department = () => import('@/views/department')
// const Expert = () => import('@/views/expert')
// const Guide = () => import('@/views/guide')
// const Introduce = () => import('@/views/introduce')
// const Intelligence = () => import('@/views/intelligence')
// const LeaderDetail = () => import('@/components/LeaderDetail')


import Department from '@/views/department'
import Expert from '@/views/expert'
import Guide from '@/views/guide'
import Introduce from '@/views/introduce'
import Intelligence from '@/views/intelligence'
import LeaderDetail from '@/components/LeaderDetail'


import Detail from '@/views/introduce/components/detail'
import Leader from '@/views/introduce/components/leader'
import Floor from '@/views/introduce/components/floor'
import IntroduceIndex from '@/views/introduce/components'

import Emergency from '@/views/guide/components/Emergency'
import GuideIndex from '@/views/guide/components'
import GuaidList from '@/views/guide/components/GuaidList'
// import GuaidListIndex from '@/views/guide/components/GuaidListIndex'
import GuaidDetail from '@/views/guide/components/GuaidDetail'


import DepartmentDetail from '@/views/department/components/DepartmentDetail'

const app = [{
  path: '/hospitalIntroduction',
  component: Introduce,
  name: 'hospitalIntroduction',
  redirect: 'hospitalIntroduction/index',
  meta: {
    title: 'aaaa'
  },
  children: [{
      name: 'index',
      path: 'index',
      component: IntroduceIndex
    },
    {
      name: 'detail',
      path: 'detail',
      component: Detail
    },
    {
      name: 'leader',
      path: 'leader',
      component: Leader
    },
    {
      name: 'floor',
      path: 'floor',
      component: Floor
    }
  ]
}, {
  path: '/expert',
  component: Expert,
  name: 'expert'
}, {
  path: '/department',
  component: Department,
  name: 'department'
}, {
  path: '/guide',
  component: Guide,
  name: 'guide',
  redirect: 'guide/index',
  children: [{
      name: 'guideIndex',
      path: 'index',
      component: GuideIndex
    },
    {
      name: 'emergency',
      path: 'emergency',
      component: Emergency
    },
  ]
}, {
  path: '/intelligence',
  component: Intelligence,
  name: 'intelligence'
}, {
  path: '/leaderDetail',
  component: LeaderDetail,
  name: 'leaderDetail',
  props: true
}, {
  path: '/guaidList',
  component: GuaidList,
  name: 'guaidList',
}, {
  name: 'guaidDetail',
  path: '/guaidDetail',
  component: GuaidDetail,
  props: true
}, {
  name: 'departmentDetail',
  path: '/departmentDetail',
  component: DepartmentDetail,
  props: true
}]

export default app