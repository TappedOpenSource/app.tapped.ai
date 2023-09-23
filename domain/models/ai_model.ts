
import { Option } from '@sniptt/monads';

export type AiModel = {
    id: string;
    userId: string;
    timestamp: Date;
    type: ModelType;
    modelId: Option<string>;
    status: 'initial'
      | 'training'
      | 'ready'
      | 'errored';
}

type ModelType = 'image';
