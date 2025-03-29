import cn from 'classnames'
import React from 'react'

interface IContainer {
  className?: string
  children?: React.ReactNode
}

export const Container = ({ className, children }: IContainer) => {
  const classes = cn('mx-auto max-w-[1136px]', className)

  return <section className={classes}>{children}</section>
}
