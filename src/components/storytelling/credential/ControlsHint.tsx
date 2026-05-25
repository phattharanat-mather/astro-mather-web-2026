import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SESSION_KEY = 'storytelling-hint-shown'

export function ControlsHint() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 4000)

    function dismiss() {
      setVisible(false)
      sessionStorage.setItem(SESSION_KEY, '1')
      clearTimeout(timer)
    }

    window.addEventListener('keydown', dismiss, { once: true })
    window.addEventListener('wheel', dismiss, { once: true })
    window.addEventListener('touchstart', dismiss, { once: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('wheel', dismiss)
      window.removeEventListener('touchstart', dismiss)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-end justify-center pb-12 pointer-events-none"
        >
          <div className="bg-neutral-900/80 backdrop-blur-sm text-white rounded-2xl px-8 py-5 text-center shadow-xl">
            <div className="flex flex-col gap-1.5 text-[13px] text-neutral-200">
              <p><span className="text-white font-medium">↓ scroll</span> to explore each scene</p>
              <p><span className="text-white font-medium">→ ←</span> jump between scenes</p>
              <p className="text-neutral-400 text-[11px] mt-1">or use the menu on the left</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
