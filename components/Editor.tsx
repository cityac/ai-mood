'use client'
import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  // eslint-disable-next-line
  const [_, setEntry] = useState(entry)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_text) => {
      if (_text === entry.content) return
      setIsSaving(true)

      const { data } = await updateEntry(entry.id, { content: _text })

      setEntry(data)
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isSaving && <div>...saving</div>}
      <textarea
        className="w-full h-full p-8 text-xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
