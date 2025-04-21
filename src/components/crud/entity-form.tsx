"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { EntityField } from "./types"

interface EntityFormProps<T> {
  initialData: Partial<T>
  fields: EntityField[]
  isLoading: boolean
  onChange: (data: Partial<T>) => void
}

export function EntityForm<T>({ initialData, fields, isLoading, onChange }: EntityFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData)

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleChange = (name: string, value: unknown) => {
    const field = fields.find((f) => f.name === name);
    const fieldType = field?.type;
    const valueType = field?.valueType;

    let parsedValue = value;

    if (fieldType === "number" && typeof value === "string") {
      parsedValue = value === "" ? "" : Number(value);
    }
    if (
      fieldType === "select" &&
      valueType === "number" &&
      typeof value === "string"
    ) {
      parsedValue = Number(value);
    }

    const updatedData = { ...formData, [name]: parsedValue };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const renderField = (field: EntityField) => {
    const rawValue = (formData as never)[field.name];
    const value = rawValue !== undefined && rawValue !== null ? String(rawValue) : "";
    
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            disabled={isLoading}
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(value) => handleChange(field.name, value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            disabled={isLoading}
            type={field.type === "number" ? "number" : "text"}
          />
        );
    }
  };

  return (
    <div className="gap-4 grid py-4">
      {fields.map((field) => (
        <div key={field.name} className="gap-2 grid">
          <label htmlFor={field.name} className="font-medium text-sm">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  )
}

