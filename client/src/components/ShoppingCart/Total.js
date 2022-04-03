import React from 'react'
import styles from './Total.module.css'

export default function ( {itemTotal, name} ) {
  return (
    <div className={styles.itemTotal}>
        <div>{name}{' total'}</div>
        <div>{itemTotal}{'€'}</div>
    </div>
  )
}
