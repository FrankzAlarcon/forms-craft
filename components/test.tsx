'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DragHandleDots2Icon } from '@radix-ui/react-icons'

const formComponents = [
  { type: 'row', label: 'Fila' },
  { type: 'input', label: 'Entrada de texto' },
  { type: 'textarea', label: 'Área de texto' },
  { type: 'checkbox', label: 'Casilla de verificación' },
  { type: 'radio', label: 'Botón de radio' },
]

export default function Component() {
  const [formStructure, setFormStructure] = useState([])
  const [generatedCode, setGeneratedCode] = useState('')
  const [draggedItem, setDraggedItem] = useState(null)

  const handleDragStart = (e, item, rowIndex = -1, componentIndex = -1) => {
    setDraggedItem({ ...item, rowIndex, componentIndex })
    e.dataTransfer.setData('text/plain', '') // Necesario para Firefox
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, targetRowIndex = -1, targetComponentIndex = -1) => {
    e.preventDefault()
    if (!draggedItem) return

    const newStructure = [...formStructure]

    // Eliminar el elemento arrastrado de su posición original
    if (draggedItem.rowIndex !== -1) {
      const sourceRow = newStructure[draggedItem.rowIndex]
      sourceRow.components.splice(draggedItem.componentIndex, 1)
      if (sourceRow.components.length === 0) {
        newStructure.splice(draggedItem.rowIndex, 1)
      }
    }

    // Añadir el elemento en la nueva posición
    if (draggedItem.type === 'row') {
      newStructure.push({ type: 'row', components: [] })
    } else if (targetRowIndex !== -1) {
      const targetRow = newStructure[targetRowIndex]
      if (targetComponentIndex !== -1) {
        targetRow.components.splice(targetComponentIndex, 0, { type: draggedItem.type })
      } else {
        targetRow.components.push({ type: draggedItem.type })
      }
    } else {
      newStructure.push({ type: 'row', components: [{ type: draggedItem.type }] })
    }

    setFormStructure(newStructure)
    setDraggedItem(null)
  }

  const generateCode = () => {
    let code = '<form>\n'
    formStructure.forEach((row) => {
      code += '  <div className="flex space-x-4">\n'
      row.components.forEach((component) => {
        switch (component.type) {
          case 'input':
            code += '    <Input type="text" placeholder="Texto" />\n'
            break
          case 'textarea':
            code += '    <Textarea placeholder="Área de texto" />\n'
            break
          case 'checkbox':
            code += '    <div className="flex items-center space-x-2">\n      <Checkbox id="checkbox" />\n      <Label htmlFor="checkbox">Etiqueta</Label>\n    </div>\n'
            break
          case 'radio':
            code += '    <RadioGroup>\n      <div className="flex items-center space-x-2">\n        <RadioGroupItem value="option1" id="radio-1" />\n        <Label htmlFor="radio-1">Opción 1</Label>\n      </div>\n      <div className="flex items-center space-x-2">\n        <RadioGroupItem value="option2" id="radio-2" />\n        <Label htmlFor="radio-2">Opción 2</Label>\n      </div>\n    </RadioGroup>\n'
            break
        }
      })
      code += '  </div>\n'
    })
    code += '</form>'
    setGeneratedCode(code)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Componentes</h2>
        {formComponents.map((component) => (
          <div
            key={component.type}
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
            className="bg-gray-200 p-2 mb-2 rounded cursor-move flex items-center"
          >
            <DragHandleDots2Icon className="mr-2" />
            {component.label}
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">
        <div
          className="bg-white p-4 rounded-lg shadow-md min-h-[400px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e)}
        >
          <h2 className="text-lg font-semibold mb-4">Constructor de Formulario</h2>
          {formStructure.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="border-2 border-dashed border-gray-300 p-2 mb-4 rounded"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, rowIndex)}
            >
              <div className="flex space-x-4">
                {row.components.map((component, componentIndex) => (
                  <div
                    key={componentIndex}
                    draggable
                    onDragStart={(e) => handleDragStart(e, component, rowIndex, componentIndex)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, rowIndex, componentIndex)}
                    className="border border-gray-200 p-2 rounded cursor-move"
                  >
                    {component.type === 'input' && <Input type="text" placeholder="Texto" />}
                    {component.type === 'textarea' && <Textarea placeholder="Área de texto" />}
                    {component.type === 'checkbox' && (
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`checkbox-${rowIndex}-${componentIndex}`} />
                        <Label htmlFor={`checkbox-${rowIndex}-${componentIndex}`}>Etiqueta</Label>
                      </div>
                    )}
                    {component.type === 'radio' && (
                      <RadioGroup>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option1" id={`radio-${rowIndex}-${componentIndex}-1`} />
                          <Label htmlFor={`radio-${rowIndex}-${componentIndex}-1`}>Opción 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option2" id={`radio-${rowIndex}-${componentIndex}-2`} />
                          <Label htmlFor={`radio-${rowIndex}-${componentIndex}-2`}>Opción 2</Label>
                        </div>
                      </RadioGroup>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {formStructure.length === 0 && (
            <p className="text-gray-500 text-center">Arrastra y suelta componentes aquí</p>
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4" onClick={generateCode}>Generar Código</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Código Generado</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <pre className="text-sm">{generatedCode}</pre>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}