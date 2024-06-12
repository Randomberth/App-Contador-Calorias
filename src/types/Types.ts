export type Meal = {
    Key?     : string,
    Calories: string,
    Name    : string,
    Portion : string,
    Date_?   : string,
  }

export type TodayCalories = {
  recomendedCalories?: number | string,
  consumedCalories?  : number | string,
  remainingCalories? : number | string,
  percentage?        : number ,
}