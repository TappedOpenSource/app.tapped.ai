class ImageSchema {
  id: string | null;
  uri: string | null;
  createdAt: string | null;

  constructor({
    id = null,
    uri = null,
    createdAt = null,
  }: Partial<ImageSchema>) {
    this.id = id;
    this.uri = uri;
    this.createdAt = createdAt;
  }
}
class InferenceJob {
  id: string | null;
  createdAt: string | null;
  prompt: string | null;
  seed: number | null;
  width: number | null;
  height: number | null;
  numberOfImages: number | null;
  state: string | null;
  steps: number | null;
  images: ImageSchema[];
  modelId: string | null;

  constructor({
    id = null,
    createdAt = null,
    prompt = null,
    seed = null,
    width = null,
    height = null,
    numberOfImages = null,
    state = null,
    steps = null,
    images = [],
    modelId = null,
  }: Partial<InferenceJob>) {
    this.id = id;
    this.createdAt = createdAt;
    this.prompt = prompt;
    this.seed = seed;
    this.width = width;
    this.height = height;
    this.numberOfImages = numberOfImages;
    this.state = state;
    this.steps = steps;
    this.images = images;
    this.modelId = modelId;
  }

  static fromResponse(job: Record<string, any>): InferenceJob {
    const images = (job['images'] as any[] | undefined) || [];
    return new InferenceJob({
      id: job['id'] as string | undefined,
      createdAt: job['createdAt'] as string | undefined,
      prompt: job['prompt'] as string | undefined,
      seed: job['seed'] as number | undefined,
      width: job['width'] as number | undefined,
      height: job['height'] as number | undefined,
      numberOfImages: job['numberOfImages'] as number | undefined,
      state: job['state'] as string | undefined,
      steps: job['steps'] as number | undefined,
      images: images.map((image) => ({
        id: image['id'] as string | undefined,
        uri: image['uri'] as string | undefined,
        createdAt: image['createdAt'] as string | undefined,
      })),
      modelId: job['modelId'] as string | undefined,
    });
  }
}

export { InferenceJob, ImageSchema };
