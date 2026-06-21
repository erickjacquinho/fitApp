import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { DateSelector } from '../../../components/molecules/DateSelector';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import WorkoutSession from '../../../db/models/WorkoutSession';
import { Q } from '@nozbe/watermelondb';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface DailyTrainingScreenProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  sessions: WorkoutSession[];
}

function DailyTrainingScreenComponent({ selectedDate, onSelectDate, sessions }: DailyTrainingScreenProps) {
  const router = useRouter();

  useEffect(() => {
    const migrateOldSessions = async () => {
      const oldSessions = await database.get<WorkoutSession>('workout_sessions').query(Q.where('target_date', null)).fetch();
      if (oldSessions.length > 0) {
        await database.write(async () => {
          const updates = oldSessions.map(s => s.prepareUpdate(session => {
            session.targetDate = new Date(session.startDate).toISOString().split('T')[0];
          }));
          await database.batch(...updates);
        });
      }
    };
    migrateOldSessions();
  }, []);

  return (
    <View className="flex-1 bg-surface-app">
      <DateSelector selectedDate={selectedDate} onSelectDate={onSelectDate} />
      
      <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 p-4">
        {sessions.length > 0 ? (
          <View className="gap-4">
            <Typography variant="title" className="mb-2">Treinos do Dia</Typography>
            {sessions.map(session => (
              <Card key={session.id} className="p-4 border-l-4 border-primary-main">
                <Typography variant="subtitle">Sessão {session.status === 'active' ? '(Em Andamento)' : '(Concluída)'}</Typography>
                <Typography variant="caption" color="muted">
                  Início: {new Date(session.startDate).toLocaleTimeString()}
                </Typography>
                <Button size="sm" variant="outline" className="mt-4" onPress={() => {
                                        if (session.status === 'active') {
                                          router.push('/training/active');
                                        } else {
                                          router.push(`/training/details/${session.id}`);
                                        }
                                      }}><Text>Detalhes</Text></Button>
              </Card>
            ))}
          </View>
        ) : (
          <View className="my-12 items-center justify-center py-10">
            <Typography variant="subtitle" className="mb-2 text-center">
              Nenhum treino planejado
            </Typography>
            <Typography variant="text" color="muted" className="text-center mb-6">
              Inicie um treino para registrá-lo neste dia.
            </Typography>
            <Button onPress={() => router.push({ pathname: '/training/programs', params: { date: selectedDate } })}><Text>Iniciar Treino</Text></Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const enhance = withObservables(['selectedDate'], ({ selectedDate }: { selectedDate: string }) => ({
  sessions: database.get<WorkoutSession>('workout_sessions').query(
    Q.where('target_date', selectedDate),
    Q.sortBy('created_at', Q.desc)
  )
}));

export const DailyTrainingScreen = enhance(DailyTrainingScreenComponent);
