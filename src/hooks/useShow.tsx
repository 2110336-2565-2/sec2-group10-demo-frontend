import { useCallback, useState } from 'react'

const useShow = (init = false) => {
  const [show, setShow] = useState(init)

  const onShow = useCallback(() => {
    setShow(true)
  }, [])

  const onClose = useCallback(() => {
    setShow(false)
  }, [])

  const onToggle = useCallback(() => {
    setShow((prev) => !prev)
  }, [])

  return {
    show,
    onShow,
    onClose,
    onToggle,
    setShow,
  }
}

export { useShow }
