import { InputFindInvoiceFacade, InputGenerateInvoiceFacade, OutputFindInvoiceFacade, OutputGenerateInvoiceFacade } from './invoice.facade.dto'

export default interface InvoiceFacadeInterface {
  find(input: InputFindInvoiceFacade): Promise<OutputFindInvoiceFacade>
  generate(input: InputGenerateInvoiceFacade): Promise<OutputGenerateInvoiceFacade>
}