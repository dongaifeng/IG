// const Department = () => import('@/views/department')
// const Expert = () => import('@/views/expert')
// const Guide = () => import('@/views/guide')
// const Introduce = () => import('@/views/introduce')
// const Intelligence = () => import('@/views/intelligence')
// const LeaderDetail = () => import('@/components/LeaderDetail')




// 医院介绍
import Introduce from '@/views/introduce'
import Detail from '@/views/introduce/components/detail'
import Leader from '@/views/introduce/components/leader'
import Floor from '@/views/introduce/components/floor'
import Structure from '@/views/introduce/components/structure'
import Traffic from '@/views/introduce/components/traffic'
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

// 专家介绍
import Expert from '@/views/expert'
import ExpertList from '@/views/expert/components/expertList'

// 智能导诊
import Intelligence from '@/views/intelligence'

// 门诊费用
import OutpatientCost from '@/views/outpatientCost'
import OutpatientCostDetial from '@/views/outpatientCost/components/OutpatientCostDetial'

// 住院费用
import InHospital from '@/views/InHospital'
import InHospitalDetial from '@/views/InHospital/components/InHospitalDetial'
import InHospitalSettlement from '@/views/InHospital/components/InHospitalSettlement'

// 挂号排版
import Register from '@/views/Register'

// 医院药品
import Drug from '@/views/Drug'

// 医疗项目
import MedicalProject from '@/views/MedicalProject'

// 床位浏览
import Bed from '@/views/bed'
import BadList from '@/views/bed/components/BadList'
import Cost from '@/views/bed/components/cost'
import BedDetail from '@/views/bed/components/detail'
import CostList from '@/views/bed/components/list'

const app = [{
  path: '/register',
  component: Register,
  name: 'register'
}, {
  path: '/inHospital',
  component: InHospital,
  name: 'inHospital'
}, {
  path: '/drug',
  component: Drug,
  name: 'drug'
}, {
  path: '/medicalProject',
  component: MedicalProject,
  name: 'medicalProject'
}, {
  path: '/hospitalIntroduction',
  component: Introduce,
  name: 'hospitalIntroduction',
  redirect: 'hospitalIntroduction/index',
  children: [{
      name: 'IntroduceIndex',
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
    },
    {
      name: 'traffic',
      path: 'traffic',
      component: Traffic
    },
    {
      name: 'structure',
      path: 'structure',
      component: Structure
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
    }
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
  path: '/bedDetail',
  component: BedDetail,
  name: 'bedDetail',
  props: true
}, {
  path: '/outpatientCostDetial',
  component: OutpatientCostDetial,
  name: 'outpatientCostDetial',
  props: true
}, {
  path: '/bed',
  name: 'bed',
  component: Bed
}, {
  component: BadList,
  path: '/bedList',
  name: 'badList',
  props: true
}, {
  component: CostList,
  path: '/costList',
  name: 'costList',
  props: true
}, {
  component: Cost,
  path: '/cost',
  name: 'cost',
  props: true
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
}, {
  name: 'inHospitalDetial',
  path: '/inHospitalDetial',
  component: InHospitalDetial,
  props: true
}, {
  name: 'inHospitalSettlement',
  path: '/inHospitalSettlement',
  component: InHospitalSettlement,
  props: true
}]

export default app