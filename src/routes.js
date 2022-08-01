import React from 'react'
const ContactForm = React.lazy(() => import('./views/contact/contact-form/ContactForm'))
const ContactList = React.lazy(() => import('./views/contact/contact-list/ContactList'))
const ContactEdit = React.lazy(() => import('./views/contact/contact-edit/ContactEdit'))

const routes = [
  { path: '/contect-form', name: 'Contact Form', element: ContactForm },
  { path: '/contect-list', name: 'Contact List', element: ContactList },
  { path: '/contect-edit/:id', name: 'Edit Contact', element: ContactEdit },
]

export default routes
