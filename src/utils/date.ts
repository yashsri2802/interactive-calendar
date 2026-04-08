export function getMonthData(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  
    const dates: Date[] = [];
  
    for (let i = adjustedStartDay - 1; i >= 0; i--) {
      dates.push(new Date(year, month, -i));
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
  
    const remainingDays = 42 - dates.length;
    for (let i = 1; i <= remainingDays; i++) {
      dates.push(new Date(year, month + 1, i));
    }
  
    return dates;
  }
  
  export function isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  
  export function isInRange(date: Date, start: Date, end: Date): boolean {
    const time = date.getTime();
    return time >= start.getTime() && time <= end.getTime();
  }
  
  export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  interface Holiday {
    date: string;
    name: string;
  }
  
  export function getHolidays(year: number, month: number): Holiday[] {
    const holidays: Record<string, Holiday[]> = {
      '0': [
        { date: `${year}-01-01`, name: "New Year's Day" },
      ],
      '1': [
        { date: `${year}-02-14`, name: "Valentine's Day" },
      ],
      '2': [
        { date: `${year}-03-17`, name: "St. Patrick's Day" },
      ],
      '3': [],
      '4': [
        { date: `${year}-05-${getMothersDayDate(year)}`, name: "Mother's Day" },
      ],
      '5': [
        { date: `${year}-06-${getFathersDayDate(year)}`, name: "Father's Day" },
        { date: `${year}-06-19`, name: "Juneteenth" },
      ],
      '6': [
        { date: `${year}-07-04`, name: "Independence Day" },
      ],
      '7': [],
      '8': [
        { date: `${year}-09-${getLaborDayDate(year)}`, name: "Labor Day" },
      ],
      '9': [
        { date: `${year}-10-31`, name: "Halloween" },
      ],
      '10': [
        { date: `${year}-11-${getThanksgivingDate(year)}`, name: "Thanksgiving" },
        { date: `${year}-11-11`, name: "Veterans Day" },
      ],
      '11': [
        { date: `${year}-12-25`, name: "Christmas" },
        { date: `${year}-12-31`, name: "New Year's Eve" },
      ],
    };
  
    return holidays[month.toString()] || [];
  }
  
  function getMothersDayDate(year: number): string {
    const may = new Date(year, 4, 1);
    let sundayCount = 0;
    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, 4, day);
      if (date.getDay() === 0) {
        sundayCount++;
        if (sundayCount === 2) {
          return day.toString().padStart(2, '0');
        }
      }
    }
    return '08';
  }
  
  function getFathersDayDate(year: number): string {
    const june = new Date(year, 5, 1);
    let sundayCount = 0;
    for (let day = 1; day <= 30; day++) {
      const date = new Date(year, 5, day);
      if (date.getDay() === 0) {
        sundayCount++;
        if (sundayCount === 3) {
          return day.toString().padStart(2, '0');
        }
      }
    }
    return '15';
  }
  
  function getLaborDayDate(year: number): string {
    const september = new Date(year, 8, 1);
    for (let day = 1; day <= 7; day++) {
      const date = new Date(year, 8, day);
      if (date.getDay() === 1) {
        return day.toString().padStart(2, '0');
      }
    }
    return '01';
  }
  
  function getThanksgivingDate(year: number): string {
    const november = new Date(year, 10, 1);
    let thursdayCount = 0;
    for (let day = 1; day <= 30; day++) {
      const date = new Date(year, 10, day);
      if (date.getDay() === 4) {
        thursdayCount++;
        if (thursdayCount === 4) {
          return day.toString().padStart(2, '0');
        }
      }
    }
    return '22';
  }
  