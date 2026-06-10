export const getSkillColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#f97316': 'skill-orange',
    '#f59e0b': 'skill-amber',
    '#eab308': 'skill-yellow',
    '#d97706': 'skill-orange-dark',
    '#8b5cf6': 'skill-purple',
    '#059669': 'skill-green',
    '#dc2626': 'skill-red',
    '#ec4899': 'skill-pink',
    '#fbbf24': 'skill-amber'
  }
  return colorMap[color] || 'skill-amber'
}

export const getGlowColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#f97316': 'from-orange-500',
    '#f59e0b': 'from-amber-500',
    '#eab308': 'from-yellow-500',
    '#d97706': 'from-orange-600',
    '#8b5cf6': 'from-purple-500',
    '#059669': 'from-green-500',
    '#dc2626': 'from-red-500',
    '#ec4899': 'from-pink-500',
    '#fbbf24': 'from-amber-400'
  }
  return colorMap[color] || 'from-amber-500'
}

export const getContactColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#f59e0b': 'contact-amber',
    '#eab308': 'contact-yellow',
    '#fbbf24': 'contact-warm',
    '#059669': 'contact-green',
    '#8b5cf6': 'contact-purple'
  }
  return colorMap[color] || 'contact-amber'
}

export const getProjectColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    '#f59e0b': 'project-color-amber',
    '#d97706': 'project-color-amber',
    '#eab308': 'project-color-amber',
    '#f97316': 'project-color-orange',
    '#fbbf24': 'project-color-amber',
    '#dc2626': 'project-color-red-dark'
  }
  return colorMap[color] || 'project-color-amber'
}
