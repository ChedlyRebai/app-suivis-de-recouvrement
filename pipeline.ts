import { Pipeline, PipelineType, pipeline } from '@xenova/transformers';

class MyTranslationPipeline {
  static task:PipelineType = 'translation';
  static model = 'Xenova/nllb-200-distilled-600M';
  static instance:any = null;

  static async getInstance(progress_callback:any = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}