import { InputAddClientFacade, InputFindClientFacade, OutputAddClientFacade, OutputFindClientFacade } from './client-adm.facade.interface.dto'


export default interface ClientAdmFacadeInterface {
  add (input: InputAddClientFacade): Promise<OutputAddClientFacade>
  find (input: InputFindClientFacade): Promise<OutputFindClientFacade>
}