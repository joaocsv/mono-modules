import { InputPaymentFacade, OutputPaymentFacade } from './payment.facade.dto'

export default interface PaymentFacadeInterface {
  process (input: InputPaymentFacade): Promise<OutputPaymentFacade>
}