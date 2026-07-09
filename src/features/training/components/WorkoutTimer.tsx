import React, { useState, useEffect } from 'react';
import { Text } from '@/components/ui/text';
import { Clock } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface WorkoutTimerProps {
  startDate: number;
  endDate?: number | null;
}

export function WorkoutTimer({ startDate, endDate }: WorkoutTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (endDate) {
      setElapsed(Math.max(0, endDate - startDate));
      return;
    }

    setElapsed(Math.max(0, Date.now() - startDate));
    const interval = setInterval(() => {
      setElapsed(Math.max(0, Date.now() - startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Badge variant="secondary" shape="pill">
      <Icon as={Clock} size={14} className="text-primary" />
      <Text variant="caption" className="text-text-primary font-mono font-bold tracking-widest mt-0.5">
        {formatDuration(elapsed)}
      </Text>
    </Badge>
  );
}
