import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice.usecase'
import GenerateInvoiceUseCase from '../usecase/generate-invoice/generate-invoice.usecase'
import { InputFindInvoiceFacade, OutputFindInvoiceFacade, InputGenerateInvoiceFacade, OutputGenerateInvoiceFacade } from './invoice.facade.dto'
import InvoiceFacadeInterface from './invoice.facade.interface'

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private readonly _findInvoiceUseCase: FindInvoiceUseCase 
  private readonly _generateInvoiceUseCase: GenerateInvoiceUseCase
  
  constructor (findInvoiceUseCase: FindInvoiceUseCase, generateInvoiceUseCase: GenerateInvoiceUseCase) {
    this._findInvoiceUseCase = findInvoiceUseCase
    this._generateInvoiceUseCase = generateInvoiceUseCase
  }

  find(input: InputFindInvoiceFacade): Promise<OutputFindInvoiceFacade> {
    return this._findInvoiceUseCase.execute(input)
  }

  generate(input: InputGenerateInvoiceFacade): Promise<OutputGenerateInvoiceFacade> {
    return this._generateInvoiceUseCase.execute(input)
  }
}