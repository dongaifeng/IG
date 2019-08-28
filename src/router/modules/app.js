const Department = () => import('@/views/department')
const Expert = () => import('@/views/expert')
const Guide = () => import('@/views/guide')
const Introduce = () => import('@/views/introduce')
const Intelligence = () => import('@/views/intelligence')
const LeaderDetail = () => import('@/components/LeaderDetail')


import Detail from '@/views/introduce/components/detail'
import Leader from '@/views/introduce/components/leader'
import Floor from '@/views/introduce/components/floor'

const app = [{
  path: '/hospitalIntroduction',
  component: Introduce,
  name: 'hospitalIntroduction',
  children: [
      {name: 'detail', path: '/detail', components: Detail},
      {name: 'leader', path: '/leader', components: Leader},
      {name: 'floor', path: '/floor', components: Floor},
  ]
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