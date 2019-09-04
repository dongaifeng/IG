// const Department = () => import('@/views/department')
// const Expert = () => import('@/views/expert')
// const Guide = () => import('@/views/guide')
// const Introduce = () => import('@/views/introduce')
// const Intelligence = () => import('@/views/intelligence')
// const LeaderDetail = () => import('@/components/LeaderDetail')


// 智能导诊
import Intelligence from '@/views/intelligence'

// 医院介绍
import Introduce from '@/views/introduce'
import Detail from '@/views/introduce/components/detail'
import Leader from '@/views/introduce/components/leader'
import Floor from '@/views/introduce/components/floor'
import IntroduceIndex from '@/views/introduce/components'
import LeaderDetail from '@/components/LeaderDetail'

// 就医指南
import Guide from '@/views/guide'
import Emergency from '@/views/guide/components/Emergency'
import GuideIndex from '@/views/guide/components'
import GuaidDetail from '@/views/guide/components/GuaidDetail'
import GuaidList from '@/views/guide/components/GuaidList'
// import GuaidListIndex from '@/views/guide/components/GuaidListIndex'

// 科室指南
import Department from '@/views/department'
import DepartmentDetail from '@/views/department/components/DepartmentDetail'
import DoctorDetail from '@/views/department/components/DoctorDetail'

// 门诊费用
import OutpatientCost from '@/views/outpatientCost'

// 专家介绍
import Expert from '@/views/expert'
import ExpertList from '@/views/expert/components/expertList'



import Bed from '@/views/bed'

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
  path: '/outpatientCost',
  component: OutpatientCost,
  name: 'outpatientCost'
}, {
  path: '/bed',
  name: 'bed',
  component: Bed
}, {
  path: '/leaderDetail',
  component: LeaderDetail,
  name: 'leaderDetail',
  props: true
}, {
  path: '/doctorDetail',
  component: DoctorDetail,
  name: 'doctorDetail',
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
}, {
  name: 'expertList',
  path: '/expertList',
  component: ExpertList,
}]

export default app