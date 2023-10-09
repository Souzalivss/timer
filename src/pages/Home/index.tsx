import { HandPalm, Play } from "phosphor-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'; //escrevo assim quando a biblioteca nao tem export default dentro
import { createContext, useState } from "react";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
  
} from "./styles";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";


interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate ?: Date
  finishedDate ?: Date

}

 interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType )

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number().min(1, 'o cliclo precisa ser de no mínimo 5 minutos').max(60, 'o ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
   
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
        task: '',
        minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle
      }
    }))
  }        



  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
  
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {

    setCycles(cycles.map(cycle => {
      if (cycle.id === activeCycleId) { 
        return {
           ...cycle, interruptDate: new Date() }
          } else {
            return cycle
          }
      
    }),
    )
    setActiveCycleId(null)

  }

 
  const task = watch('task');
  const isSubmitDisabled = !task;  

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
       <CyclesContext.Provider 
       value={{ 
        activeCycle, 
       activeCycleId, 
       markCurrentCycleAsFinished, 
       amountSecondsPassed,
       setSecondsPassed,
        }}>
        
       <FormProvider {...newCycleForm}>
        <NewCycleForm />
        </FormProvider>
        <Countdown />
        </CyclesContext.Provider>
        

       { activeCycle  ? (
         <StopCountdownButton onClick={handleInterruptCycle} type="button">
         <HandPalm size={24} />
         Interromper
       </StopCountdownButton>
       ) : (
        <StartCountdownButton disabled={isSubmitDisabled} onClick={handleInterruptCycle} type="submit">
        <Play size={24} />
        começar
      </StartCountdownButton>
       )}

      </form>
    </HomeContainer>
  );
}