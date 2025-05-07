// components/WaterTracker.jsx
'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WaterTracker() {
  const [todayCount, setTodayCount] = useState(null);
  const [history, setHistory] = useState({});
  const [today, setToday] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getToday = () => {
      const now = new Date();
      return now.toLocaleDateString('en-CA');
    };

    const currentDate = getToday();
    setToday(currentDate);

    const data = JSON.parse(localStorage.getItem("water-tracker") || "{}");
    if (data[currentDate]) {
      setTodayCount(data[currentDate]);
    } else {
      setTodayCount(0);
    }
    setHistory(data);
  }, []);

  const handleDrink = () => {
    const newCount = (todayCount || 0) + 1;
    const updatedHistory = { ...history, [today]: newCount };
    setTodayCount(newCount);
    setHistory(updatedHistory);
    localStorage.setItem("water-tracker", JSON.stringify(updatedHistory));
  };

  if (todayCount === null || today === '') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start p-4">
      <h1 className="text-3xl font-bold mb-6 mt-4">Contador de Água 💧</h1>
      <Card className="w-full max-w-md mb-6">
        <CardContent className="flex flex-col items-center p-6">
          <p className="text-lg mb-4">Data: {today}</p>
          <p className="text-2xl font-semibold mb-4">Levantadas hoje: {todayCount}</p>
          <Button onClick={handleDrink}>+1 Beber Água</Button>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-semibold mb-4">Histórico 📅</h2>
      <div className="w-full max-w-md space-y-2">
        {Object.entries(history)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([date, count]) => (
            <Card key={date}>
              <CardContent className="flex justify-between p-4">
                <span>{date}</span>
                <span>{count}x</span>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
