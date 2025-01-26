import { MealsRepository } from '@/meals/repositories/meals.repository'
import { inject, injectable } from 'tsyringe'

export namespace DeleteMealsUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  @injectable()
  export class UseCase {
    constructor(
      @inject('MealsRepository')
      private mealsRepository: MealsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.mealsRepository.delete(input.id)
    }
  }
}
