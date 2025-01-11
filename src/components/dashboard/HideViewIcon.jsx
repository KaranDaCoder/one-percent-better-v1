'use client';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'

const HideViewIcon = ({comp}) => {
 const [view, setView] = useState(true);
 
  return (
    <button onClick={() => setView(!view)}>
      {view ? < EyeOff /> : <Eye />}
    </button>
  )
}

export default HideViewIcon