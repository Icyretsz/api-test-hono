'use client'
import {useEffect, useState} from "react";

export default function Home() {

  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    const getTotalSpent = async () => {
      const response = await fetch('/api/expenses/total-spent')
      const data = await response.json()
      if (response.ok) {
        setTotalSpent(data.total);
      } else {
        console.error('Failed to fetch total spent');
      }
    }
    getTotalSpent()
  }, [])

  return (
   <div>
     Total spent : {totalSpent}
   </div>
  );
}
