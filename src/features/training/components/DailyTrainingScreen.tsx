import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { DateSelector } from '../../../components/molecules/DateSelector';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import WorkoutSession from '../../../db/models/WorkoutSession';
import { Q } from '@nozbe/watermelondb';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";

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
    <View className="flex-1">
      <DateSelector selectedDate={selectedDate} onSelectDate={onSelectDate} />
      
      <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 py-4">
        {sessions.length > 0 ? (
          <View className="gap-4">
            <Text variant="title" className="mb-2">Treinos do dia</Text>
            {sessions.map(session => (
              <Card key={session.id} className="p-4 border-l-4 border-primary">
                <Text variant="subtitle">Sessão {session.status === 'active' ? '(Em Andamento)' : '(Concluída)'}</Text>
                <Text variant="caption" className="text-text-secondary">
                  Início: {new Date(session.startDate).toLocaleTimeString()}
                </Text>
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
            <Text variant="subtitle" className="mb-2 text-center">
              Nenhum treino planejado
            </Text>
            <Text variant="text" className="text-text-secondary text-center mb-6">
              Inicie um treino para registrá-lo neste dia.
            </Text>
            <Button onPress={() => router.push({ pathname: '/training/programs', params: { date: selectedDate } })}><Text>Iniciar treino</Text></Button>
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
