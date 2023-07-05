import { Timer,DraftList } from "./champ-select-types"
import { Connection } from "./connection-types"


export function isTimer(requestBody: Timer | DraftList):requestBody is Timer {
    return (requestBody as Timer).seconds !== undefined
}

export function isDraftlist(requestBody: Timer | DraftList):requestBody is DraftList {
    return (requestBody as DraftList).turn !== undefined
}

export function isConnection(requestBody: unknown):requestBody is Connection {
    if  (requestBody !==undefined) {
        return (requestBody as Connection).draftIDs !== undefined
    }
    else {return(false)}
}
