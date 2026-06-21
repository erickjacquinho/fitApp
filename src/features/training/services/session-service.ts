import { database } from '../../../db';
import WorkoutSession from '../../../db/models/WorkoutSession';
import ExerciseExecution from '../../../db/models/ExerciseExecution';
import { ExecutionDTO } from '../types';
import { Q } from '@nozbe/watermelondb';

export class SessionService {
  private static sessionsCollection = database.get<WorkoutSession>('workout_sessions');
  private static executionsCollection = database.get<ExerciseExecution>('exercise_executions');

  static async startSession(programId: string, targetDate: string): Promise<WorkoutSession> {
    return await database.write(async () => {
      // Check if there is an active session
      const activeSessions = await this.sessionsCollection
        .query(Q.where('status', 'active'))
        .fetch();

      // If there are active sessions, mark them completed/cancelled or just return the current active one
      if (activeSessions.length > 0) {
        return activeSessions[0];
      }

      return await this.sessionsCollection.create((session) => {
        session.programId = programId;
        session.startDate = Date.now();
        session.status = 'active';
        session.targetDate = targetDate;
      });
    });
  }

  static async getActiveSession(): Promise<WorkoutSession | null> {
    const activeSessions = await this.sessionsCollection
      .query(Q.where('status', 'active'))
      .fetch();
    return activeSessions.length > 0 ? activeSessions[0] : null;
  }

  static async logSet(
    sessionId: string,
    exerciseId: string,
    data: ExecutionDTO
  ): Promise<ExerciseExecution> {
    return await database.write(async () => {
      // Check if this set execution already exists to update it, or create a new one
      const existingExecutions = await this.executionsCollection
        .query(
          Q.where('workout_session_id', sessionId),
          Q.where('exercise_id', exerciseId),
          Q.where('set_number', data.setNumber)
        )
        .fetch();

      if (existingExecutions.length > 0) {
        const existing = existingExecutions[0];
        return await existing.update((exec) => {
          exec.repsDone = data.repsDone;
          exec.weight = data.weight;
          exec.repsReserveDone = data.repsReserveDone;
        });
      }

      return await this.executionsCollection.create((exec) => {
        exec.workoutSessionId = sessionId;
        exec.exerciseId = exerciseId;
        exec.setNumber = data.setNumber;
        exec.repsDone = data.repsDone;
        exec.weight = data.weight;
        exec.repsReserveDone = data.repsReserveDone;
      });
    });
  }

  static async deleteSet(
    sessionId: string,
    exerciseId: string,
    setNumber: number
  ): Promise<void> {
    await database.write(async () => {
      const existingExecutions = await this.executionsCollection
        .query(
          Q.where('workout_session_id', sessionId),
          Q.where('exercise_id', exerciseId),
          Q.where('set_number', setNumber)
        )
        .fetch();

      if (existingExecutions.length > 0) {
        await existingExecutions[0].destroyPermanently();
      }
    });
  }

  static async finishSession(sessionId: string): Promise<WorkoutSession> {
    return await database.write(async () => {
      const session = await this.sessionsCollection.find(sessionId);
      if (!session) {
        throw new Error('Workout session not found');
      }

      return await session.update((record) => {
        record.status = 'completed';
        record.endDate = Date.now();
      });
    });
  }

  static async getHistory(): Promise<WorkoutSession[]> {
    return await this.sessionsCollection
      .query(Q.sortBy('start_date', Q.desc))
      .fetch();
  }

  static async getSessionDetails(sessionId: string): Promise<{
    session: WorkoutSession;
    executions: ExerciseExecution[];
  }> {
    const session = await this.sessionsCollection.find(sessionId);
    const executions = await session.executions.fetch();
    return { session, executions };
  }
}
