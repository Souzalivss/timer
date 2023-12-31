import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from './styles'
import { useContext } from 'react'

export function History() {
    const { cycles } = useContext(CyclesContext)
    return (
        <HistoryContainer>
            <h1>meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
            <tr>
                <th>tarefa</th>
                <th>duração</th>
                <th>inicio</th>
                <th>status</th>
            </tr>
             
            </thead>
<tbody>
    {cycles.map(cycle => {
        return (
            <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                })}
                </td>
                <td>
                    { cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>)}

                    { cycle.interruptDate && (
                    <Status statusColor="red">interrompido</Status>)}    

                    {(!cycle.finishedDate && !cycle.interruptDate) && (
                    <Status statusColor="yellow">Em andamento</Status>)}    
                </td>
            </tr>
        )
    })}
</tbody>

                </table>
            </HistoryList>
        </HistoryContainer>
    )
}