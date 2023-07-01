import { DraftList } from "./champ-select-types"

export const checkChamplist = (newDraft:DraftList,currentDraft:DraftList) => {
  if (newDraft.champList !== currentDraft.champList){
    const newObj1 = {...newDraft,
      champlist: currentDraft.champList
    }
    return(newObj1)
  }
}