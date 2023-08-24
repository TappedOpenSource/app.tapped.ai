
import { Option } from '@sniptt/monads';

export type AiModel = {
    id: string;
    userId: string;
    timestamp: Date;
    type: ModelType;
    modelId: Option<string>;
    modelStatus: 'initial'
      | 'training'
      | 'ready'
      | 'inferring'
      | 'errored';
}

type ModelType = 'image';
