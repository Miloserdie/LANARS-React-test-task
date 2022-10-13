export const shuffleArray = (array) => {
    let currentIndex = array.length,  randomIndex;

    const currentArray = [...array];

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [currentArray[currentIndex], currentArray[randomIndex]] = [
            currentArray[randomIndex], currentArray[currentIndex]];
    }

    return currentArray.map((item) => {
        return  {
            value: item,
            isGuessed: false,
            isHold: false,
            id: Math.random().toString(20).substring(2)
        }
    });
}