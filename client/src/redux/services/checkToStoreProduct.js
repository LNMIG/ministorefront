const checkToStoreProduct = (pastSelection, currentSelection) => {

    if (pastSelection.length === 0) return [currentSelection]
    
    for (let i=0; i<pastSelection.length; i++) {
        if (pastSelection[i].setId === currentSelection.setId && pastSelection[i].attByDefault.length === 0) {
            pastSelection[i].quantity = pastSelection[i].quantity + currentSelection.quantity
            return pastSelection
        }

        if (pastSelection[i].setId === currentSelection.setId){
            let even = 0;
            for (let j=0; j<pastSelection[i].attByDefault.length; j++) {

                if (Object.values(pastSelection[i].attByDefault[j]).toString() === Object.values(currentSelection.attByDefault[j]).toString()) {
                    even +=1
                }
            }

            if (even === pastSelection[i].attByDefault.length) {
                pastSelection[i].quantity = pastSelection[i].quantity + currentSelection.quantity
                return pastSelection
            }
        }
    }

    pastSelection.push(currentSelection)
    return pastSelection
}
export default checkToStoreProduct