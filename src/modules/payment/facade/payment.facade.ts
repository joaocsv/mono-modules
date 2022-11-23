import UseCaseInterface from '../../@shared/usecase/usecase.interface'
import { InputPaymentFacade, OutputPaymentFacade } from './payment.facade.dto'
import PaymentFacadeInterface from './payment.facade.interface'

export default class PaymentFacade implements PaymentFacadeInterface {
  private readonly _processPaymentUseCase: UseCaseInterface

  constructor (processPaymentUseCase: UseCaseInterface) {
    this._processPaymentUseCase = processPaymentUseCase
  }

  process(input: InputPaymentFacade): Promise<OutputPaymentFacade> {
    return this._processPaymentUseCase.execute(input)
  }
}