import { database } from '../../../db';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { BlockDTO } from '../types';
import { capitalizeWords } from '../../../lib/utils';

export class TrainingBlockService {
  private static collection = database.get<TrainingBlock>('training_blocks');

  static prepareCreate(programId: string, blockData: BlockDTO): TrainingBlock {
    return this.collection.prepareCreate((block) => {
      block.programId = programId;
      block.name = capitalizeWords(blockData.name);
      block.order = blockData.order;
    });
  }

  static prepareUpdate(blockRecord: TrainingBlock, blockData: BlockDTO): TrainingBlock {
    return blockRecord.prepareUpdate((b) => {
      b.name = capitalizeWords(blockData.name);
      b.order = blockData.order;
    });
  }

  static prepareDelete(blockRecord: TrainingBlock): TrainingBlock {
    return blockRecord.prepareMarkAsDeleted();
  }
}
