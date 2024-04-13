import { pipeline, env, PipelineType } from '@xenova/transformers'

env.allowLocalModels = false

class Pipeline {
  static task: PipelineType = 'object-detection'
  static model = 'Xenova/detr-resnet-50'
  static instance: any = null

  static async getInstance(progress_callback: Function | undefined) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback })
    }
    return this.instance
  }
}

self.addEventListener('message', async event => {
  let detector = await Pipeline.getInstance((x: any) => {
    self.postMessage(x)
  })

  let result = await detector(event.data.image, { percentage: true })
  self.postMessage({ status: 'complete', result })
})