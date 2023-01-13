// converts a Date object to a string in format YYYY-MM-DD

export function convertDateToString(date: Date):string {
    const year:string = date.getFullYear().toString();
    const month:number = date.getMonth();
    const day: number = date.getDate();

    const addZeroString = (number: number):string => {
        let numberString:string = number.toString();
        if (number < 10) {
            numberString = `0${numberString}`
        }
        return numberString;
    }

    const monthString:string = addZeroString(month);
    const dayString:string = addZeroString(day);

  return `${year}-${monthString}-${dayString}`
}