import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
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
    <tr>
        <td>tarefa</td>
        <td>28 minutos</td>
        <td>há 2 meses</td>
        <td>
            <Status statusColor='green' >Concluido</Status>
        </td>
    </tr>
    <tr>
        <td>tarefa</td>
        <td>28 minutos</td>
        <td>há 2 meses</td>
        <td>
        <Status statusColor='green'>Concluido</Status>
        </td>
    </tr>
    <tr>
        <td>tarefa</td>
        <td>28 minutos</td>
        <td>há 2 meses</td>
        <td>
        <Status statusColor='green'>Concluido</Status>
        </td>
    </tr>
    <tr>
        <td>tarefa</td>
        <td>28 minutos</td>
        <td>há 2 meses</td>
        <td>
        <Status statusColor='green'>Concluido</Status>
        </td>
    </tr>
    <tr>
        <td>tarefa</td>
        <td>28 minutos</td>
        <td>há 2 meses</td>
        <td>
        <Status statusColor='green'>Concluido</Status>
        </td>
    </tr>
</tbody>

                </table>
            </HistoryList>
        </HistoryContainer>
    )
}