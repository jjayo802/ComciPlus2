export let timetables;

export function GetTableTD(day, period) 
{
    return <td className="memo" onClick={() => {setMemoOpen(true)}}><b>{timetables[day][period].name}</b><br /><span>{timetables[day][period].memo}</span></td>
}