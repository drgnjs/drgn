import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-identicon-sprites'
import type { ImgHTMLAttributes } from 'react'

interface Attributes extends ImgHTMLAttributes<HTMLImageElement> {
  seed: string
}

const Avatar = ({ seed, ...rest }: Attributes) => {
  const dataUri = createAvatar(style, {
    seed,
    dataUri: true
  })

  return <img src={dataUri} alt='avatar' {...rest} />
}

export default Avatar
