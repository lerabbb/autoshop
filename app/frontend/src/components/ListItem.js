import React from 'react'
import { Link } from 'react-router-dom'

export default function ListItem({text, link}) {
  return (
    <Link className='list-group-item list-group-item-action' to={link}> {text} </Link>
  )
}
