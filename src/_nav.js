import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'New Contact',
    to: '/contect-form',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Contact List',
    to: '/contect-list',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
]

export default _nav
