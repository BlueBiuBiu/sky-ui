export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  'text',
  '',
] as const

export const buttonSizes = [
  'default',
  'large',
  'small',
  ''
] as const

export const buttonProps = {
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  size: {
    type: {
      type: String,
      values: buttonSizes,
      default: '',
    },
  },
} as const