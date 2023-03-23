const weekLabels = [ "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato","Domenica"]

const monthLabels = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]

function retrieveWeeks(month:number, year:number) {
    let array = [];

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(
      new Date(year, month + 1, 1).getTime() - 24 * 60 * 60 * 1000
    );

    //prefix if firstDate is 0 (domenica)
    if (firstDate.getDay() === 0) {
        for (let i = 1; i < 7; i++) {
            array.unshift({
              currentMonth: false,
              date: new Date(
                new Date(year, month, firstDate.getDate()).getTime() - i * 24 * 60 * 60 * 1000
              ),
            });
          }
    }


    //default prefix
    for (let i = 1; i < firstDate.getDay(); i++) {
      array.unshift({
        currentMonth: false,
        date: new Date(
          new Date(year, month, firstDate.getDate()).getTime() - i * 24 * 60 * 60 * 1000
        ),
      });
    }

    

    for (let i = firstDate.getDate(); i <= lastDate.getDate(); i++) {
      array.push({
        currentMonth: true,
        date: new Date(year, month, i),
        today:
          new Date(year, month, i).toDateString() === new Date().toDateString(),
      });
    }

    //suffix
    if (lastDate.getDay() !== 0) {
        for (let i = lastDate.getDay(); i < 7; i++) {
            array.push({
              currentMonth: false,
              date: new Date(new Date(year, month + 1, i - lastDate.getDay() + 1)),
            });
          }
    }
    
    return array;
  }

  function getDateFromWeekNumber(w:number, y:number = new Date().getFullYear()) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}



  function getWeekFromDate(date : Date) {
    const startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date.getTime() - startDate.getTime()) /
        (24 * 60 * 60 * 1000));
          
    return Math.ceil(days / 7);
  }

  function getCurrentWeek () {
    return getWeekFromDate(new Date())

  }

  function getWeekDayLabel(dayIndex:number) {
    if (dayIndex === 0) {
      return weekLabels[weekLabels.length -1]
    } else {
      return weekLabels[dayIndex -1]
    }
  }

  function getArrayFromDatesRange(start: string | Date, end: string|Date) {
    const startTime = typeof start === 'string' ? new Date(new Date(start).setHours(0,0,0,0)).getTime() : start.getTime()
    const endTime = typeof end === 'string' ? new Date(new Date(end).setHours(0,0,0,0)).getTime() : end.getTime()
    let resultArray = [];
    for (let i = startTime; i<= endTime; i+= 24*60*60*1000) {
      resultArray.push(new Date(i))
    }
    return resultArray
  }

  function calculateRequestStaffHours(start: string | Date, end: string|Date) {
    let resultArray = []
    let startDate = typeof start === 'string' ? new Date(start) : start
    let endDate = typeof end === 'string' ? new Date(end) : end
    //in case the day is equal
    if (startDate.toLocaleDateString() === endDate.toLocaleDateString()) {
      resultArray.push({
        start: startDate,
        end: endDate
      })
      return resultArray
    }

    const startTime = new Date(new Date(startDate).setHours(9,0,0,0)).getTime()
    const endTime = endDate.getTime()
    
    const dayTime = 24*60*60*1000
    //need to see if endTime is > then startTime of 1 day (24*60*60*1000)
    //if yes -> we need to push 8 hours of that day
    //if no -> we need to report the difference between them
    for (let i = startTime; i<= endTime; i+= 24*60*60*1000) {
      if (i + dayTime < endTime) {
        resultArray.push({
          start: new Date(i),
          end: new Date(new Date(i).getTime() + 8*60*60*1000)
        })
      } else {
        resultArray.push({
          start: new Date(i),
          end: new Date(endTime)
        })
      }
      
    }
    return resultArray
  }


export {weekLabels, monthLabels, retrieveWeeks, getDateFromWeekNumber, getCurrentWeek, getWeekFromDate, getWeekDayLabel, getArrayFromDatesRange, calculateRequestStaffHours}








