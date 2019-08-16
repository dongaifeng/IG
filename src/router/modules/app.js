const Department = () => import('@/views/department')
const Expert = () => import('@/views/expert')
const Guide = () => import('@/views/guide')
const Introduce = () => import('@/views/introduce')
const Intelligence = () => import('@/views/intelligence')
const LeaderDetail = () => import('@/components/LeaderDetail')

const app = [{
  path: '/hospitalIntroduction',
  component: Introduce,
  name: 'hospitalIntroduction'
},{
  path: '/expert',
  component: Expert,
  name: 'expert'
},{
  path: '/department',
  component: Department,
  name: 'department'
},{
  path: '/guide',
  component: Guide,
  name: 'guide'
},{
  path: '/intelligence',
  component: Intelligence,
  name: 'intelligence'
},{
  path: '/leaderDetail',
  component: LeaderDetail,
  name: 'leaderDetail'
}]

export default app